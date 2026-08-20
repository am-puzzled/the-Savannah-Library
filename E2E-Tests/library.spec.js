
import { test, expect } from '@playwright/test';

test.describe("Savannah Library", () => {
  //1. Check if the page actually loads and the heading appears
    test("displays the Savannah Library heading", async ({ page }) => {
      await page.goto("/");

      const heading = page.getByRole("heading", {
        name: "The Savannah Library"
      });

      await expect(heading).toBeVisible();
  });

  // 2. verify the 3 original books are visible
    test("displays the three original books", async ({ page }) => {
      await page.goto("/");

      await expect(page.getByText("Maasai Mara")).toBeVisible();
      await expect(page.getByText("Tears")).toBeVisible();
      await expect(page.getByText("Kangaroos")).toBeVisible();
    });

  // 3. Add a book like a real user
    test("user can add a new book", async ({ page }) => {
      await page.goto("/");

      // add book
      await page.getByPlaceholder("Title").fill("Desert Winds");
      await page.getByPlaceholder("Author").fill("A. Noor");
      await page.getByPlaceholder("Genre").fill("Adventure");
      await page.getByPlaceholder("Year").fill("2024");

      //click submit
      await page.getByRole("button", { name: "Add Book" }).click();

      // check if book apppeared
      await expect(page.getByText("Desert Winds")).toBeVisible();
      await expect(page.getByText("A. Noor")).toBeVisible();
      await expect(page.getByText("Adventure")).toBeVisible();
      await expect(page.getByText("2024")).toBeVisible();
    });

  // 4. User can update an existing book
    test("User can update an existing book", async ({ page }) => {
      await page.goto("/");

      // add book
      await page.getByPlaceholder("Title").fill("Desert Winds");
      await page.getByPlaceholder("Author").fill("A. Noor");
      await page.getByPlaceholder("Genre").fill("Adventure");
      await page.getByPlaceholder("Year").fill("2024");

      //click submit
      await page.getByRole("button", { name: "Add Book" }).click();

      // Comfirm the book was added 
      await expect(page.getByText("Desert Winds")).toBeVisible();
      await expect(page.getByText("A. Noor")).toBeVisible();
      await expect(page.getByText("Adventure")).toBeVisible();
      await expect(page.getByText("2024")).toBeVisible();

      //press the update button
      await page.getByRole("button", { name: "update" }).click();

      // Search if book to update exists
      await page.getByPlaceholder("Enter Book title to UPDATE").fill("Desert Winds");
        // submit lookup form
        await page
          .locator(".checkIfNamesMatchForm")
          .getByRole("button", { name: "submit" })
          .click();

      //Fill in the new Details
      await page.getByPlaceholder("Enter new Book title").fill("Ocean Waves");
      await page.getByPlaceholder("Enter new Book author").fill("B. Tisk");
      await page.getByPlaceholder("Enter new Book genre").fill("Visionary");
      await page.getByPlaceholder("Enter new Book year").fill("2029");

      // submit the new book
      await page.getByRole("button", {name:"submit"}).click();

      // check if new book appears
      await expect(page.getByText("Ocean Waves")).toBeVisible();
      await expect(page.getByText("B. Tisk")).toBeVisible();
      await expect(page.getByText("Visionary")).toBeVisible();
      await expect(page.getByText("2029")).toBeVisible();

    });

  // 5. User can delete an existing book
    test("User can delete an existing book", async ({ page }) => {
      await page.goto("/");

      // add book
      await page.getByPlaceholder("Title").fill("Desert Winds");
      await page.getByPlaceholder("Author").fill("A. Noor");
      await page.getByPlaceholder("Genre").fill("Adventure");
      await page.getByPlaceholder("Year").fill("2024");

      //click submit
      await page.getByRole("button", { name: "Add Book" }).click();

      // Comfirm the book was added 
      await expect(page.getByText("Desert Winds")).toBeVisible();
      await expect(page.getByText("A. Noor")).toBeVisible();
      await expect(page.getByText("Adventure")).toBeVisible();
      await expect(page.getByText("2024")).toBeVisible();

      //press the delete button
      await page.getByRole("button", { name: "delete" }).click();

      // Search if book to delete exists
      await page.getByPlaceholder("Enter Book title to DELETE").fill("Desert Winds");
        // submit lookup form
        await page
          .locator(".checkIfNamesMatchForm")
          .getByRole("button", { name: "submit" })
          .click();

      // Check the deletion worked
      await expect(page.getByText("Desert Winds")).not.toBeVisible();
      await expect(page.getByText("A. Noor")).not.toBeVisible();
      await expect(page.getByText("Adventure")).not.toBeVisible();
      await expect(page.getByText("2024")).not.toBeVisible();

    });

});
