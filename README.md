# FullStack-Engineering-Karatu-2026-First-Semester-Assessment-1-

# AltSchool Africa - School of Engineering Assignment

**Student Name:** Saheed Adeolu Lawal  
**AltSchool Student ID:** ALT/SOE/KAR/026/0591  
**Program Track:** AI Full-Stack Software Engineering  

---

## Part A: HTML Profile & Application Form

* **Global Navigation:** Present at the top of both `index.html` and `form.html`, allowing seamless movement between pages.
* **Component Implementation:** `index.html` includes an accessible accordion built using semantic `<details>` and `<summary>` elements.
* **Fragment Identifier:** `Back to Top ↑` links and section anchors (`#basic-info`, `#biography`, `#why-joined`, `#goals`, `#faq`) are implemented on both pages.
* **Form Mirroring:** `form.html` mirrors the AltSchool application and portal authentication flow using accessible `<fieldset>`, `<legend>`, `<label>`, `<input>`, `<select>`, and `<button>` elements.
* **Footer:** Contains semantic `<address>` tags with contact details and copyright declarations.
* **Constraint:** Strictly built **without CSS**.

---

## Part B: JavaScript Problems (Slide 294)

The solutions to Problems 1 through 5 are fully implemented and verified in `problems.js`:

1. **Problem 1 (`deepEqual`)**: Recursively compares two objects key-by-key and value-by-value without using `JSON.stringify`.
2. **Problem 2 (`diffObjects`)**: Returns added, removed, and changed top-level properties between two objects using `Set` and `Object.hasOwn`.
3. **Problem 3 (`deepFreeze`)**: Recursively freezes nested objects and returns the fully frozen root object.
4. **Problem 4 (`createCounter`)**: Creates a counter with private state encapsulated inside a closure, exposing `increment()`, `decrement()`, and a `value` getter.
5. **Problem 5 (`validateSchema`)**: Validates an object against a schema map, returning detailed error messages for missing properties or type mismatches.

### Running Tests Locally

```bash
node problems.js
```
