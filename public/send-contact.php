<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$allowedOrigins = [
    'https://www.wellpredict.co.uk',
    'https://wellpredict.co.uk',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: $origin");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request']);
    exit;
}

function clean_text($value, $maxLength = 2000) {
    $value = trim((string) $value);
    $value = str_replace(["\r", "\n"], ' ', $value);
    $value = strip_tags($value);
    return mb_substr($value, 0, $maxLength);
}

function clean_multiline($value, $maxLength = 5000) {
    $value = trim((string) $value);
    $value = strip_tags($value);
    return mb_substr($value, 0, $maxLength);
}

$honeypot = trim((string) ($data['company_website'] ?? ''));
if ($honeypot !== '') {
    http_response_code(200);
    echo json_encode(['ok' => true]);
    exit;
}

$to = 'hello@wellpredict.co.uk';

$type = clean_text($data['type'] ?? $data['enquiryType'] ?? 'contact', 80);
$name = clean_text($data['name'] ?? '', 120);
$organisation = clean_text($data['organisation'] ?? '', 180);
$email = trim((string) ($data['email'] ?? ''));
$phone = clean_text($data['phone'] ?? '', 80);
$sector = clean_text($data['sector'] ?? '', 120);
$enquiryType = clean_text($data['enquiryType'] ?? '', 120);
$date = clean_text($data['date'] ?? '', 80);
$sourcePage = clean_text($data['sourcePage'] ?? '', 180);
$role = clean_text($data['role'] ?? '', 120);
$teamSize = clean_text($data['teamSize'] ?? '', 80);
$interest = clean_multiline($data['interest'] ?? '', 5000);
$message = clean_multiline($data['message'] ?? '', 5000);

if ($message === '' && $interest !== '') {
    $message = $interest;
}

$allowedTypes = ['contact', 'pilot', 'careers', 'newsletter'];
if (!in_array($type, $allowedTypes, true)) {
    $type = 'contact';
}

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Please enter a valid email address.']);
    exit;
}

if ($type === 'newsletter') {
    $subject = 'Newsletter signup: ' . $email;
    $body = "New newsletter signup from the WellPredict website.\n\n";
    $body .= "Email: $email\n";
    $body .= "Submitted: " . date('c') . "\n";
} else {
    if ($name === '' || $organisation === '' || $message === '') {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields.']);
        exit;
    }

    if ($type === 'pilot') {
        $subject = 'New WellPredict pilot request';
    } elseif ($type === 'careers') {
        $subject = 'New WellPredict careers interest';
    } else {
        $subject = 'New WellPredict enquiry';
    }

    $body = "New website submission from WellPredict.\n\n";
    $body .= "Type: $type\n";
    $body .= "Name: $name\n";
    $body .= "Organisation: $organisation\n";
    $body .= "Email: $email\n";
    if ($phone !== '') {
        $body .= "Phone: $phone\n";
    }
    if ($sector !== '') {
        $body .= "Sector: $sector\n";
    }
    if ($role !== '') {
        $body .= "Role: $role\n";
    }
    if ($teamSize !== '') {
        $body .= "Team size: $teamSize\n";
    }
    if ($enquiryType !== '') {
        $body .= "Enquiry type: $enquiryType\n";
    }
    if ($date !== '') {
        $body .= "Preferred contact date: $date\n";
    }
    if ($sourcePage !== '') {
        $body .= "Source page: $sourcePage\n";
    }
    $body .= "Submitted: " . date('c') . "\n\n";
    $body .= "Message:\n$message\n";
}

$headers = [];
$headers[] = 'From: WellPredict Website <hello@wellpredict.co.uk>';
$headers[] = 'Reply-To: ' . str_replace(["\r", "\n"], '', $email);
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'X-Mailer: PHP/' . phpversion();

$sent = @mail($to, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send message. Please email hello@wellpredict.co.uk directly.']);
    exit;
}

http_response_code(200);
echo json_encode(['ok' => true]);
