# Requirements Specification - QR Code Web Application

## 1. Project Overview

**Purpose:** A web application that generates scannable QR codes from user input and allows downloading them as SVG files.

**Technology Stack:**
- Backend: Node.js with Express
- View Engine: EJS
- QR Generation: @klas05/qr-generator (custom module)
- Module Type: ES6 Modules

---

## 2. Functional Requirements

| ID | Requirement |
|----|-------------|
| **FR-1** | The system shall enforce a maximum input length of 17 characters |
| **FR-2** | The system shall display a real-time character counter |
| **FR-3** | The system shall validate that input is not empty before generation |
| **FR-4** | The system shall generate a QR code when user submits valid input |
| **FR-5** | The system shall display the generated QR code on the same page |
| **FR-6** | The system shall render QR codes as SVG format |
| **FR-7** | The system shall generate scannable QR codes |
| **FR-8** | The system shall provide a download button for generated QR codes |
| **FR-9** | The system shall download QR codes as SVG files when download button is clicked |
| **FR-10** | Downloaded SVG files shall be standalone and scannable |
| **FR-11** | The system shall display error messages inline |

---

## 3. Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| **NFR-1** | The system shall be responsive across different device sizes |
| **NFR-2** | The system shall support keyboard navigation |
| **NFR-3** | The system shall handle all errors gracefully |

---

## 4. Technical Requirements

| ID | Requirement |
|----|-------------|
| **TR-1** | The system shall use Express framework for HTTP server |
| **TR-2** | The system shall use EJS as the view template engine |
| **TR-3** | The system shall serve static files from public directory |
| **TR-4** | The system shall implement GET / route for homepage |

---

## 5. Test Case Mapping

Each requirement ID (FR-1 through FR-11, NFR-1 through NFR-3, TR-1 through TR-4) shall have a corresponding test case with the same ID.

## 6. Success Criteria

The application is considered successful when:

- [ ] All functional requirements (FR-1 through FR-11) are implemented and tested
- [ ] All non-functional requirements (NFR-1 through NFR-3) are met
- [ ] All technical requirements (TR-1 through TR-4) are implemented
- [ ] All test cases pass (to be verified during testing phase)
- [ ] QR codes generated are verified as scannable
- [ ] Application is deployed and accessible

---

## 7. Requirements Summary

| Category | Count | IDs |
|----------|-------|-----|
| Functional Requirements | 11 | FR-1 to FR-11 |
| Non-Functional Requirements | 3 | NFR-1 to NFR-3 |
| Technical Requirements | 5 | TR-1 to TR-4 |
| **Total Requirements** | **19** | - |
