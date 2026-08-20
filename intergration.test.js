import { describe, it, expect, beforeEach, vi } from "vitest";

describe("Savannah Library", () => {

    // We need these elements to exist inside jsdom b4 each test
    // before each then gives each test a fresh DOM b4 each operation
    beforeEach(async () => {
        document.body.innerHTML = `
            <div id="BooksBox">
            <form id="enterCustomBookform">
                <input id="title" />
                <input id="author" />
                <input id="genre" />
                <input id="year" />
                <button type="submit">Add Book</button>
            </form>
            </div>

            <table>
            <tbody class="forOriginalRows"></tbody>
            <tbody id="forCustomRows" class="forCustomRows"></tbody>
            </table>

            <button class="update">update</button>
            <button class="delete">delete</button>

            <div class="newFormArea" id="newFormArea"></div>`;

            // tells Vitest: “Forget the cached JavaScript module. When I import it again, execute it fresh.”
            vi.resetModules();

            // we need the dom to be created b4 the import
            await import("./theSavannahLibrary.js");
    });

    // testing the form
    it("adds a submitted book to the custom books table", () => {
        // fill form
            document.getElementById("title").value = "Desert Winds";
            document.getElementById("author").value = "A. Noor";
            document.getElementById("genre").value = "Adventure";
            document.getElementById("year").value = "2024";
        //submit event fires
         //app creates the book object
          //table DOM updates
            const form = document.getElementById("enterCustomBookform");

                form.dispatchEvent(
                    new Event("submit", {
                    bubbles: true,
                    cancelable: true,
                    })
                );
        //we check if indeed table was updated
            const customRows = document.getElementById("forCustomRows");
             expect(customRows.textContent).toContain("Desert Winds");

    });

    it("shows the update form when the entered book exists in the table", () => {
        // 1. First add a custom book
            document.getElementById("title").value = "Desert Winds";
            document.getElementById("author").value = "A. Noor";
            document.getElementById("genre").value = "Adventure";
            document.getElementById("year").value = "2024";

            document
                .getElementById("enterCustomBookform")
                .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        // 2. Click the update button
             document.querySelector(".update").click();
        // 3. Fill in the title of the book we just added in the search box
            const oldTitleInput = document.querySelector(
                'input[placeholder=" Enter Book title to UPDATE"]'
            );

            oldTitleInput.value = "Desert Winds";
         // 4. Submit the lookup form
            const lookupForm = document.querySelector(".checkIfNamesMatchForm");

            lookupForm.dispatchEvent(
                new Event("submit", { bubbles: true, cancelable: true })
            );

        // 5. Check that the real update form appeared
             const newTitleInput = document.querySelector(
                'input[placeholder=" Enter new book title"]'
            );

            expect(newTitleInput).not.toBeNull();
    });

    it("shows an error when the book to update does not exist in the table", () => {
        // 1. Open the update lookup form
            document.querySelector(".update").click();
        // 2. Enter a title that does not exist
            const oldTitleInput = document.querySelector(
                'input[placeholder=" Enter Book title to UPDATE"]'
            );

            oldTitleInput.value = "Unknown Book";
        // 3. Submit the lookup form
            const lookupForm = document.querySelector(".checkIfNamesMatchForm");

            lookupForm.dispatchEvent(
                new Event("submit", {
                bubbles: true,
                cancelable: true,
                })
            );
        // 4. Check the error message
            const errorMessage = document.querySelector(".errorMessage");

            expect(errorMessage.textContent).toBe(
                "The book you are trying to update is not on the above table"
            );
    });

    it("successfully updates an existing custom book", () => {
        // 1. Add the original book
            document.getElementById("title").value = "Desert Winds";
            document.getElementById("author").value = "A. Noor";
            document.getElementById("genre").value = "Adventure";
            document.getElementById("year").value = "2024";

            document
                .getElementById("enterCustomBookform")
                .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        // 2. Open update flow--click update--newForm apppear--check if book exists
            document.querySelector(".update").click();

            const oldTitleInput = document.querySelector(
                'input[placeholder=" Enter Book title to UPDATE"]'
            );

            oldTitleInput.value = "Desert Winds";
          // Checkpoint: If wrong name is entered we'll see it here  
            expect(oldTitleInput.value).toBe("Desert Winds");

            document
                .querySelector(".checkIfNamesMatchForm")
                .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        // 3. Fill in the new book details
            document.querySelector(
                'input[placeholder=" Enter new Book title"]'
            ).value = "Ocean Winds";

            document.querySelector(
                'input[placeholder=" Enter new Book Author"]'
            ).value = "B. Noor";

            document.querySelector(
                'input[placeholder=" Enter new Book Genre"]'
            ).value = "Travel";

            document.querySelector(
                'input[placeholder=" Enter new Book Year"]'
            ).value = "2025";
        // 4. Submit the real update form
            document
                .querySelector(".newForm")
                .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

        // 5. Verify old book is gone
            const customRows = document.getElementById("forCustomRows");
            expect(customRows.textContent).not.toContain("Desert Winds");
        // 6. Verify updated book appears
            expect(customRows.textContent).toContain("Ocean Winds");
            expect(customRows.textContent).toContain("B. Noor");
            expect(customRows.textContent).toContain("Travel");
            expect(customRows.textContent).toContain("2025");

    });

    it("successfully DELETES an existing custom book", () => {
        // 1. Add the original book
            document.getElementById("title").value = "Desert Winds";
            document.getElementById("author").value = "A. Noor";
            document.getElementById("genre").value = "Adventure";
            document.getElementById("year").value = "2024";

            document
                .getElementById("enterCustomBookform")
                .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        // 2. Open delete flow--click delete--newForm apppear--check if book exists
            document.querySelector(".delete").click();

            const deleteTitleInput = document.querySelector(
                'input[placeholder=" Enter Book title to DELETE"]'
            );

            deleteTitleInput.value = "Desert Winds";
          // Checkpoint: If wrong name is entered we'll see it here  
            expect(deleteTitleInput.value).toBe("Desert Winds");

            document
                .querySelector(".checkIfNamesMatchForm")
                .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        // 3. Verify old book is gone
            const customRows = document.getElementById("forCustomRows");
            expect(customRows.textContent).not.toContain("Desert Winds");
    });

    it("shows an error when the book to DELETE does not exist in the table", () => {
        // 1. No Book is originally added
        // 2. Open delete flow--click delete--newForm apppear--check for a non-existent book
            document.querySelector(".delete").click();

            const deleteTitleInput = document.querySelector(
                'input[placeholder=" Enter Book title to DELETE"]'
            );

            deleteTitleInput.value = "Non Existent";

            document
                .querySelector(".checkIfNamesMatchForm")
                .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        // 3. Check the error message
            const errorMessage = document.querySelector(".errorMessage");

            expect(errorMessage.textContent).toBe(
                "The book you are trying to delete is not on the above table"
            );

    });

    it("renders the three initial books when the app loads", () => {
        const originalRows = document.querySelector(".forOriginalRows");

        expect(originalRows.textContent).toContain("Maasai Mara");
        expect(originalRows.textContent).toContain("Tears");
        expect(originalRows.textContent).toContain("Kangaroos");
    });

    it("shows a success message after adding a book", () => {
        // 1. Fill the add-book form
            document.getElementById("title").value = "Desert Winds";
            document.getElementById("author").value = "A. Noor";
            document.getElementById("genre").value = "Adventure";
            document.getElementById("year").value = "2024";
        // 2. Submit
            document
                .getElementById("enterCustomBookform")
                .dispatchEvent(
                    new Event("submit", {
                        bubbles: true,
                        cancelable: true,
                    })
                );
        // 3. Check success feedback
            const successMessage = document.querySelector(".successMessage");

            expect(successMessage.textContent).toBe("Book Succesfully Added");
    });

    it("shows a success message after updating a book", () => {
        // 1. Add original custom book
            document.getElementById("title").value = "Desert Winds";
            document.getElementById("author").value = "A. Noor";
            document.getElementById("genre").value = "Adventure";
            document.getElementById("year").value = "2024";

            document
                .getElementById("enterCustomBookform")
                .dispatchEvent(
                    new Event("submit", {
                        bubbles: true,
                        cancelable: true,
                    })
                );
        // 2. Open update flow
            document.querySelector(".update").click();

            const oldTitleInput = document.querySelector(
                'input[placeholder=" Enter Book title to UPDATE"]'
            );

            oldTitleInput.value = "Desert Winds";

            document
                .querySelector(".checkIfNamesMatchForm")
                .dispatchEvent(
                    new Event("submit", {
                        bubbles: true,
                        cancelable: true,
                    })
                );
        // 3. Fill updated details
            document.querySelector(
                'input[placeholder=" Enter new Book title"]'
            ).value = "Ocean Winds";

            document.querySelector(
                'input[placeholder=" Enter new Book Author"]'
            ).value = "B. Noor";

            document.querySelector(
                'input[placeholder=" Enter new Book Genre"]'
            ).value = "Travel";

            document.querySelector(
                'input[placeholder=" Enter new Book Year"]'
            ).value = "2025";
        // 4. Submit update
            document
                .querySelector(".newForm")
                .dispatchEvent(
                    new Event("submit", {
                        bubbles: true,
                        cancelable: true,
                    })
                );
        // 5. Check success feedback
            const successMessage =
                document.querySelector("#newFormArea .successMessage");

            expect(successMessage.textContent).toBe("Succesfully Updated");
    });

    it("shows a success message after deleting a book", () => {
        // 1. Add custom book
            document.getElementById("title").value = "Desert Winds";
            document.getElementById("author").value = "A. Noor";
            document.getElementById("genre").value = "Adventure";
            document.getElementById("year").value = "2024";

            document
                .getElementById("enterCustomBookform")
                .dispatchEvent(
                    new Event("submit", {
                        bubbles: true,
                        cancelable: true,
                    })
                );
        // 2. Open delete flow
            document.querySelector(".delete").click();

            const deleteTitleInput = document.querySelector(
                'input[placeholder=" Enter Book title to DELETE"]'
            );

            deleteTitleInput.value = "Desert Winds";
        // 3. Submit delete lookup
            document
                .querySelector(".checkIfNamesMatchForm")
                .dispatchEvent(
                    new Event("submit", {
                        bubbles: true,
                        cancelable: true,
                    })
                );
        // 4. Check success feedback
            const successMessage =
                document.querySelector("#newFormArea .successMessage");

            expect(successMessage.textContent).toBe("Succesfully Deleted");
    });

    it("closes the update form when cancel is clicked", () => {
        // 1. Open update form
            document.querySelector(".update").click();

            expect(
                document.querySelector(".checkIfNamesMatchForm")
            ).not.toBeNull();
        // 2. Click cancel
             document.querySelector(".cancelUpdateButton").click();
        // 3. Form should disappear
            expect(
                document.querySelector(".checkIfNamesMatchForm")
            ).toBeNull();
    });

    it("closes the delete form when cancel is clicked", () => {
        // 1. Open delete form
            document.querySelector(".delete").click();

            expect(
                document.querySelector(".checkIfNamesMatchForm")
            ).not.toBeNull();
        // 2. Click cancel
            document.querySelector(".cancelUpdateButton").click();
        // 3. Form should disappear
            expect(
                document.querySelector(".checkIfNamesMatchForm")
            ).toBeNull();
    });
    
});