# Test Cases - QR Code Web Application

## Overview

This document contains test cases mapped 1:1 to requirements in [REQUIREMENTS.md](REQUIREMENTS.md).

**Test Status:** PASS | FAIL | NOT TESTED

---

## Quick Reference

### Functional Requirements

| Test ID  | Requirement                      | Status |
| -------- | -------------------------------- | ------ |
| TC-FR-1  | Maximum input length enforcement | PASS   |
| TC-FR-2  | Real-time character counter      | PASS   |
| TC-FR-3  | Empty input validation           | PASS   |
| TC-FR-4  | QR code generation               | PASS   |
| TC-FR-5  | QR code display on same page     | PASS   |
| TC-FR-6  | SVG format rendering             | PASS   |
| TC-FR-7  | Scannable QR codes               | PASS   |
| TC-FR-8  | Download button provision        | PASS   |
| TC-FR-9  | SVG file download                | FAIL   |
| TC-FR-10 | Standalone SVG files             | PASS   |
| TC-FR-11 | Inline error display             | PASS   |

### Non-Functional Requirements

| Test ID  | Requirement             | Status |
| -------- | ----------------------- | ------ |
| TC-NFR-1 | Responsive design       | PASS   |
| TC-NFR-2 | Keyboard navigation     | PASS   |
| TC-NFR-3 | Graceful error handling | PASS   |

### Technical Requirements

| Test ID | Requirement                     | Status |
| ------- | ------------------------------- | ------ |
| TC-TR-1 | Express framework configuration | PASS   |
| TC-TR-2 | EJS view engine configuration   | PASS   |
| TC-TR-3 | Static file serving             | PASS   |
| TC-TR-4 | GET / route implementation      | PASS   |

---

## Detailed Test Procedures

### TC-FR-1: Maximum Input Length Enforcement

**Requirement:** FR-1 | **Priority:** High

**Steps:**

1. Navigate to app
2. Attempt to type 20 characters: "12345678901234567890"
3. Verify that the form is non submittable when exceeding 17 bytes of input.

**Expected:** Form button gets disabled when exceeding input limit.

---

### TC-FR-2: Real-time Character Counter

**Requirement:** FR-2 | **Priority:** Medium

**Steps:**

1. Navigate to app (counter shows "0/17")
2. Type "Hello" - verify shows "5/17"
3. Delete all text - verify shows "0/17"
4. Paste "Hello World" - verify shows "11/17"

**Expected:** Counter updates immediately as user types

---

### TC-FR-3: Empty Input Validation

**Requirement:** FR-3 | **Priority:** High

**Steps:**

1. Navigate to app
2. Leave input field empty
3. Click "Generate QR Code"
4. Note: Browser's `required` attribute prevents submission
5. (Optional) Use DevTools to remove `required` attribute and retest to verify server-side validation

**Expected:** Browser shows native validation message. If `required` removed: server error "Please enter some text...", no QR code generated

---

### TC-FR-4: QR Code Generation

**Requirement:** FR-4 | **Priority:** Critical

**Steps:**

1. Navigate to app
2. Enter "Hello World"
3. Click "Generate QR Code"
4. Check browser console for errors

**Expected:** QR code generates without errors, SVG appears on page

---

### TC-FR-5: QR Code Display on Same Page

**Requirement:** FR-5 | **Priority:** High

**Steps:**

1. Navigate to app
2. Note current URL
3. Enter "Test123" and click generate
4. Verify URL unchanged

**Expected:** QR code appears below form on same page

---

### TC-FR-6: SVG Format Rendering

**Requirement:** FR-6 | **Priority:** High

**Steps:**

1. Generate QR code
2. Inspect element using DevTools
3. Verify `<svg>` tags present
4. Zoom browser to test scalability

**Expected:** Valid SVG markup, black on white, scalable without quality loss

---

### TC-FR-7: Scannable QR Codes

**Requirement:** FR-7 | **Priority:** Critical

**Steps:**

1. Generate QR code with text "Scan Test 123"
2. Display on screen
3. Scan with a known working tool for example a smartphone
4. Verify scanned content

**Expected:** QR scans successfully, content matches input exactly

---

### TC-FR-8: Download Button Provision

**Requirement:** FR-8 | **Priority:** High

**Steps:**

1. Navigate to app - verify no download button
2. Generate QR code
3. Verify download button appears

**Expected:** Download button visible only after generation

---

### TC-FR-9: SVG File Download

**Requirement:** FR-9 | **Priority:** Critical

**Steps:**

1. Generate QR code
2. Click "Download SVG" button
3. Check downloads folder
4. Verify filename format

**Expected:** File downloads as qrcode-[timestamp].svg

---

### TC-FR-10: Standalone SVG Files

**Requirement:** FR-10 | **Priority:** Critical

**Steps:**

1. Download SVG file from TC-FR-9
2. Open file in web browser
3. Scan QR code from opened file

**Expected:** SVG opens independently, is scannable, content matches

---

### TC-FR-11: Inline Error Display

**Requirement:** FR-11 | **Priority:** High

**Steps:**

1. Use DevTools to remove `required` attribute from input field
2. Submit empty form OR trigger module validation error
3. Observe error presentation (should appear below input field)
4. Verify no browser alert() popup appears

**Expected:** Error shown inline with colored styling (red/pink background), no browser alerts

---

### TC-NFR-1: Responsive Design

**Requirement:** NFR-1 | **Priority:** High

**Steps:**

1. Open DevTools device toolbar
2. Test desktop (1920x1080) - verify centered layout
3. Test 600px width - verify no horizontal scroll

**Expected:** Layout adapts to size, no horizontal scroll

---

### TC-NFR-2: Keyboard Navigation

**Requirement:** NFR-2 | **Priority:** High

**Steps:**

1. Navigate to app (don't use mouse)
2. Press Tab - should focus input
3. Type text, press Tab - should focus button
4. Press Enter - should submit form
5. Verify visible focus indicators

**Expected:** All elements accessible via Tab/Enter, visible focus indicators

---

### TC-NFR-3: Graceful Error Handling

**Requirement:** NFR-3 | **Priority:** Critical

**Steps:**

1. Generate qr code using input "lnu.se"
2. Open devtools and remove element with id "qr-display"
3. Try to download qr code
4. Verify alert popup

**Expected:** No unhandled exceptions, user-friendly messages, app stays functional

---

### TC-TR-1: Express Framework Configuration

**Requirement:** TR-1 | **Priority:** Critical

**Steps:**

1. Run `npm start`
2. Observe console for startup message
3. Navigate to http://localhost:3000

**Expected:** Server starts on port 3000, logs message, responds to requests

---

### TC-TR-2: EJS View Engine Configuration

**Requirement:** TR-2 | **Priority:** High

**Steps:**

1. Check src/app.js for `app.set('view engine', 'ejs')`
2. View page source - verify HTML (not EJS syntax)
3. Verify header/footer partials included

**Expected:** EJS configured, views directory set, partials work

---

### TC-TR-3: Static File Serving

**Requirement:** TR-3 | **Priority:** High

**Steps:**

1. Open DevTools Network tab
2. Refresh page
3. Verify CSS loads from /css/styles.css (200 status)
4. Verify JS loads from /js/client.js (200 status)

**Expected:** Static files return 200, no 404 errors

---

### TC-TR-4: GET / Route Implementation

**Requirement:** TR-4 | **Priority:** Critical

**Steps:**

1. Navigate to http://localhost:3000/
2. Check Network tab for 200 status
3. Verify initial state (no error, no QR, empty input)

**Expected:** Returns 200, renders index.ejs with empty state

---

## Test Summary

| Category             | Total  | Passed | Failed | Not Tested |
| -------------------- | ------ | ------ | ------ | ---------- |
| Functional (FR)      | 11     | 11     | 0      | 0          |
| Non-Functional (NFR) | 3      | 3      | 0      | 0          |
| Technical (TR)       | 4      | 4      | 0      | 0          |
| **TOTAL**            | **18** | **18** | **0**  | **0**      |
