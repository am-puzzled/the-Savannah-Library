import { normalize } from "./utils.js";

// create required buttons
const updateButton = document.querySelector(".update");
const deleteButton = document.querySelector(".delete");

updateButton.addEventListener("click", updateContent);
deleteButton.addEventListener("click", deleteContent);
  
  //  we need to define json objects to represent INITIAL 3 books
    const book = {
      title:"Maasai Mara",
      author:"k. Kakai",
      genre:"Tourism",
      year:2007,
      id:"Maasai Mara"
    }
    const book2 = {
      title:"Tears",
      author:"The Weekend",
      genre:"Music",
      year:2013,
      id:"Tears"
    }
    const book3 = {
      title:"Kangaroos",
      author:"D. Smith",
      genre:"Nature",
      year:1984,
      id:"Kangaroos"
    }

  // Create an array to hold these permanent books
    let books = [book,book2,book3];

  // Create another  array to hold Custom books
    let customBooks = [];

  // Lets work on what happens when we add a book
    //Start by re-creating the form
      
      const form = document.getElementById('enterCustomBookform');
        form.addEventListener('submit', (e)=>{


        // preventing default reload for whole page
           e.preventDefault();

           
        // Get values from the form inputs
          const title = document.getElementById("title").value;
          const author = document.getElementById("author").value;
          const genre = document.getElementById("genre").value;
          const year = document.getElementById("year").value;

        // let's create a book object everytime someone submits book info
          const yourDesiredBook = {
            title:title,
            author:author,
            genre:genre,
            year:year,
            id:title
          };


        // Let's update the books List
         // Add to global array
          customBooks.push(yourDesiredBook);

        // console.log(`${yourDesiredBook.title}`);
         // then let's add it automatically to the books list
          representCustomBooks();

          // Show A succesful addition Message 
                // create a success message container
                    const SuccessMessageContainer = document.createElement(`div`);
                      SuccessMessageContainer.classList.add(`SuccessMessageContainer`);
                      

                  // show them an success message
                    const successMessage = document.createElement(`p`);
                      successMessage.classList.add(`successMessage`);
                      successMessage.textContent = `Book Succesfully Added`;

                  // add the success message to the container
                    SuccessMessageContainer.append(successMessage);
                  
                  //if an success message exists dont display twice
                    const BooksBox = document.getElementById("BooksBox");
                    const messageContainerExists = BooksBox.querySelector(`.SuccessMessageContainer`);

                      if(messageContainerExists){
                        //if theres a container dont do anything
                          return;
                      }
                      else{
                        BooksBox.append(SuccessMessageContainer);
                      }
              
                //remove the message container after 2 seconds to clean it
                setTimeout(()=>{
                    SuccessMessageContainer.remove();

                // Reset the form only (clears all fields)..
                  // last thing to ensure data is sent b4 resetting it
                    form.reset();
                },2000);

        });

        


  //let the 3 permanent books be represented automaticallly on load
    window.onload = representPermanentBooks();

  //represent permanent books
  function representPermanentBooks (){

    //Use for each to represent the books

      books.forEach((book)=>{
         
        // create data row for each set of boook properties i.e a row for title,author,,genre and year
          const tableRow  = document.createElement(`tr`);
           
          // the title,author,,genre and year
            const dataRow1 = document.createElement(`td`);
              dataRow1.innerHTML = book.title;
               dataRow1.classList = "th";
            const dataRow2 = document.createElement(`td`);
              dataRow2.innerHTML = book.author;
               dataRow2.classList = "th";
            const dataRow3 = document.createElement(`td`);
              dataRow3.innerHTML = book.genre;
               dataRow3.classList = "th";
            const dataRow4 = document.createElement(`td`);
              dataRow4.innerHTML = book.year;
               dataRow4.classList = "th";


        //Append everything to its container
          tableRow.append(dataRow1,dataRow2,dataRow3,dataRow4);
         
    // Append to html doc
      document.body.querySelector(`.forOriginalRows`).append(tableRow);

    });

     

  }

  function updateContent(){

    
    // First of all we want to check if the book they want to change is stored
      const oldTitle = document.createElement('input');
      oldTitle.classList = "titleBox";
      oldTitle.type = "text";
      oldTitle.placeholder = " Enter Book title to UPDATE";
    // very important attribute this
      oldTitle.required = true;

      const checkIfNamesMatchForm = document.createElement('form');
        checkIfNamesMatchForm.classList.add("formBox2","checkIfNamesMatchForm");
      // Form components
        // to submit old book name and continue to next step
          const submitButton = document.createElement('button');
            submitButton.classList.add("submitButton");
            submitButton.innerHTML = "submit";
            submitButton.type = `submit`;
           
            
           //if: to cancel this operation
            const cancelUpdateButton = document.createElement('button');
              cancelUpdateButton.classList.add("cancelUpdateButton");
              cancelUpdateButton.innerHTML = "x";
              cancelUpdateButton.type = "button"; // so it won’t trigger submit
              cancelUpdateButton.addEventListener('click',()=>{
                //remove the previous form from container b4 proceeding
                  const formContainer = document.getElementById(`newFormArea`);
                    formContainer.textContent = "";;
              })

          //Make sure user doesnt enter nothing

            checkIfNamesMatchForm.addEventListener('submit', (e) => {
               e.preventDefault();

            // Make sure users enter something
              if(oldTitle.value.trim() ===""){
                console.log(`Y0u have to enter something`);
                return;
              }
              
                console.log(oldTitle.value);
                console.log(customBooks);

              // check if we have that book we want to change
                // normalize--uses regex to remove all spaces in the name for easier match
                  const match = customBooks.find(book => normalize(book.title) === normalize(oldTitle.value));

                      if (match) {
                        continueUpdating(oldTitle);
                      } else {
                        stopUpdating();
                      }
            });

     // Assemble the form components together

       checkIfNamesMatchForm.append(oldTitle,submitButton,cancelUpdateButton);

          // only add the form to the container if it doesn't exist

           
              //create container
                const formContainer = document.getElementById(`newFormArea`);
              //Check if existing
                const formExists = formContainer.querySelector(`.checkIfNamesMatchForm`);
              //what happens if it exists

                if(formExists){
                  formExists.remove();
                }
                else{
                  formContainer.append(checkIfNamesMatchForm);
                }
  }


  function continueUpdating(oldTitle){

  //remove the previous form from newFormArea b4 proceeding
    const newFormArea = document.getElementById(`newFormArea`);
      newFormArea.textContent = "";

  // create a new form to enter new book details
    const newForm = document.createElement('form');
      newForm.classList.add("formBox2","newForm");

        //form inputs
          const newTitle = document.createElement('input');
            newTitle.classList.add("titleBox");
            newTitle.type = "text";
            newTitle.placeholder = " Enter new Book title";
            newTitle.required = true ;
            // newTitleValue = newTitle.value;

          const newAuthor = document.createElement('input');
            newAuthor.classList.add( "authorBox");
            newAuthor.type = "text";
            newAuthor.placeholder = " Enter new Book Author";
            newAuthor.required = true ;
          
          const newGenre = document.createElement('input');
            newGenre.classList.add("genreBox");
            newGenre.type = "text";
            newGenre.placeholder = " Enter new Book Genre";
            newGenre.required = true ;

          const newYear = document.createElement('input');
            newYear.classList.add("yearBox");
            newYear.type = "number";
            newYear.placeholder = " Enter new Book Year";
            newYear.required = true ;

          const cancelUpdateButton = document.createElement('button');
            cancelUpdateButton.classList.add("cancelUpdateButton");
            cancelUpdateButton.innerHTML = "x";
            cancelUpdateButton.type ="button";// prevent submission
            cancelUpdateButton.addEventListener('click',()=>{

               //remove the previous form from newFormArea b4 proceeding
                const newFormArea = document.getElementById(`newFormArea`);
                  newFormArea.textContent = "";;
            })

          const submitButton = document.createElement('button');
            submitButton.classList.add("submitButton");
            submitButton.innerHTML = "submit";
            submitButton.type = "submit";

    //Form --where the real biz happens  
      newForm.addEventListener('submit', (e)=>{
          e.preventDefault();

        //create a new json object
          const yourUpdatedBook = {
            title:  newTitle.value,
            author: newAuthor.value,
            genre:  newGenre.value,
            year:   newYear.value,
            id:    newTitle.value
          };

          console.log(yourUpdatedBook);
          

        //delete the previous one from the array
          customBooks = customBooks.filter(book=> normalize(book.id) !== normalize(oldTitle.value));
        
        //add the new one to the array
          customBooks.push(yourUpdatedBook);
            //  console.log(customBooks);

        //represent new data on the table with the
          representCustomBooks();
        
        //Add a quick message to tell them updated succesfully
            // create a success message container
              const SuccessMessageContainer = document.createElement(`div`);
                SuccessMessageContainer.classList.add(`SuccessMessageContainer`);
                

            // show them an success message
              const successMessage = document.createElement(`p`);
                successMessage.classList.add(`successMessage`);
                successMessage.textContent = `Succesfully Updated`;

            // add the success message to the container
              SuccessMessageContainer.append(successMessage);
            
            //if an success message exists dont display twice
              const formContainer = document.getElementById("newFormArea");
              const messageContainerExists = formContainer.querySelector(`.SuccessMessageContainer`);

                if(messageContainerExists){
                  //if theres a container dont do anything
                    return;
                }
                else{
                  formContainer.append(SuccessMessageContainer);
                }
          
        //remove form after 2 seconds to clean it
        setTimeout(()=>{
            formContainer.textContent = "";;
        },3000);
  
      });
            

    //Assemble the form
      newForm.append(newTitle,newAuthor,newGenre,newYear,submitButton,cancelUpdateButton);

      // add the form to the display
        document.body.querySelector(`.newFormArea`).append(newForm);
  }

  function stopUpdating(){
    // delete any previous error message b4 if any
      const MessageContainer = document.createElement(`div`);
        MessageContainer.classList.add(`MessageContainer`);
        MessageContainer.textContent = "";

    // show them an error message
      const errorMessage = document.createElement(`p`);
        errorMessage.textContent = `The book you are trying to update is not on the above table`;
        errorMessage.classList.add(`errorMessage`);

    // add the error message to the display
      MessageContainer.append(errorMessage);
    
    //if an error message exists dont display twice
      const formContainer = document.getElementById("newFormArea");
      const messageContainerExists = formContainer.querySelector(`.MessageContainer`);
        if(messageContainerExists){
          //if theres a container dont do anything
            return;
        }
        else{
          formContainer.append(MessageContainer);
        }
  }

  function deleteContent(){

    // First of all we want to check if the book they want to change is stored
      const oldTitle = document.createElement('input');
      oldTitle.classList.add("titleBox");
      oldTitle.type = "text";
      oldTitle.placeholder = " Enter Book title to DELETE";
        // very important attribute this
      oldTitle.required = true;

      const checkIfNamesMatchForm = document.createElement('form');
        checkIfNamesMatchForm.classList.add("formBox2","checkIfNamesMatchForm");

      // Form components
        // to submit old book name and continue to next step
          const submitButton = document.createElement('button');
            submitButton.classList.add("submitButton");
            submitButton.innerHTML = "submit";
            submitButton.type = `submit`;
           
            
           //if: to cancel this operation
            const cancelUpdateButton = document.createElement('button');
              cancelUpdateButton.classList.add("cancelUpdateButton");
              cancelUpdateButton.innerHTML = "x";
              cancelUpdateButton.type="button";
              cancelUpdateButton.addEventListener('click',()=>{
                //remove the previous form from newFormArea b4 proceeding
                  const newFormArea = document.getElementById(`newFormArea`);
                    newFormArea.textContent = "";;
              })

          //Make sure user doesnt enter nothing

            checkIfNamesMatchForm.addEventListener('submit', (e) => {
               e.preventDefault();

            // Make sure users enter something
              if(oldTitle.value.trim() ===""){
                console.log(`Y0u have to enter something`);
                return;
              }
              
                console.log(oldTitle.value);
                console.log(customBooks);

              // check if we have that book we want to change
                //use the regex here
                  const match = customBooks.find(book => normalize(book.title) === normalize(oldTitle.value));

                      if (match) {
                        continueDeleting(oldTitle);
                      } else {
                        stopDeleting();
                      }
            });

      // Assemble the form components together
        checkIfNamesMatchForm.append(oldTitle,submitButton,cancelUpdateButton);


      // only add the form to the container if it doesn't exist

              
                  //create container
                    const formContainer = document.getElementById(`newFormArea`);
                  //Check if existing
                    const formExists = formContainer.querySelector(`.checkIfNamesMatchForm`);
                  //what happens if it exists

                    if(formExists){
                      formExists.remove();
                    }
                    else{
                      formContainer.append(checkIfNamesMatchForm);
                    }
                    

  }

  function stopDeleting(){
    // delete any previous error message b4 if any
      const MessageContainer = document.createElement(`div`);
        MessageContainer.classList.add(`MessageContainer`);
        MessageContainer.textContent = "";

    // show them an error message
      const errorMessage = document.createElement(`p`);
        errorMessage.textContent = `The book you are trying to delete is not on the above table`;
        errorMessage.classList.add(`errorMessage`);

    // add the error message to the display
      MessageContainer.append(errorMessage);
    
    //if an error message exists dont display twice
      const formContainer = document.getElementById("newFormArea");
      const messageContainerExists = formContainer.querySelector(`.MessageContainer`);
        if(messageContainerExists){
          //if theres a container dont do anything
            return;
        }
        else{
          formContainer.append(MessageContainer);
        }
  }

  function continueDeleting(oldTitle){
    
              //Use regex to remove all spaces in the name for easier match
                const match = customBooks.find(book => normalize(book.id) === normalize(oldTitle.value));

              //filter out that selected book and return a new array without it
                if (match) {
                  customBooks = customBooks.filter(
                    book=> normalize(book.id) !== normalize(oldTitle.value) );

                      //Represent the new books on the table again
                        representCustomBooks();

                       console.log(`books ${customBooks}`);

                    // Show A succesful deletion Message then remove the container
                      // create a success message container
                          const SuccessMessageContainer = document.createElement(`div`);
                            SuccessMessageContainer.classList.add(`SuccessMessageContainer`);
                            

                        // show them an success message
                          const successMessage = document.createElement(`p`);
                            successMessage.classList.add(`successMessage`);
                            successMessage.textContent = `Succesfully Deleted`;

                        // add the success message to the container
                          SuccessMessageContainer.append(successMessage);
                        
                        //if an success message exists dont display twice
                          const formContainer = document.getElementById("newFormArea");
                          const messageContainerExists = formContainer.querySelector(`.SuccessMessageContainer`);

                            if(messageContainerExists){
                              //if theres a container dont do anything
                                return;
                            }
                            else{
                              formContainer.append(SuccessMessageContainer);
                            }
                    
                      //remove form after 3 seconds to clean it
                      setTimeout(()=>{
                          formContainer.textContent = "";;
                      },3000);
  

                } else {
                  console.log(`An error occured`);
                }
  }

  //represent the updated books
  function representCustomBooks (){

    //remove the previous rows from forCustomRows b4 proceeding
      const containerforCustomRows = document.getElementById(`forCustomRows`);
        containerforCustomRows.textContent = "";

      //Use for each to represent the books

        customBooks.forEach((book)=>{
          
          // create data row for each set of boook properties i.e a row for title,author,,genre and year
            const tableRow  = document.createElement(`tr`);
            
            // the title,author,,genre and year
              const dataRow1 = document.createElement(`td`);
                dataRow1.innerHTML = book.title;
                dataRow1.classList = "th";
              const dataRow2 = document.createElement(`td`);
                dataRow2.innerHTML = book.author;
                dataRow2.classList = "th";
              const dataRow3 = document.createElement(`td`);
                dataRow3.innerHTML = book.genre;
                dataRow3.classList = "th";
              const dataRow4 = document.createElement(`td`);
                dataRow4.innerHTML = book.year;
                dataRow4.classList = "th";


       //Append everything to its container
         tableRow.append(dataRow1,dataRow2,dataRow3,dataRow4);
          
      // Append to html doc
        document.body.querySelector(`.forCustomRows`).append(tableRow);

      });

    }
