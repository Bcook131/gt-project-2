$(document).ready(function() {
    // Gets an optional query string from our url (i.e. ?post_id=23)
    var url = window.location.search;
    var ;
    // Sets a flag for whether or not we're updating a post to be false initially
  
    // email, occupation, games, password, repassword
  
    // Getting jQuery references to the post body, title, form, and category select
    let firstNameInput = $("#firstName");
    let lastNameInput= $("#lastName");
    let emailInput = $("#email");
    let password = $("paswword");
    let rePassword = $("re-enterPassword")
    let occupationSelection= $("#occupation");
    let gameOne = $("gameOne");
    let gameTwo = $("gameTwo");
    let gameThree = $("gameThree");
   
    // Adding an event listener for when the form is submitted
    $(signUp).on("submit", function handleFormSubmit(event) {
      event.preventDefault();
      // Wont submit the post if we are missing a body or a title
      if (!firstNameInput.val().trim() || !lastNameInput.val().trim() || !emailInput.val().trim() || !occupationSelection.val().trim() || !password.val().trim() || !rePassword.val().trim()|| | !gameOne.val() || !gameTwo.val() || !gameThree.val()) {
          message: "All fields must be completed"
        return message;
      } else if (password !=rePassword){
          //both passwords must match
          return 
      }

      // Constructing a newPost object to hand to the database
      let newUser = {
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailInput,
        profession_id : occupationSelection,
        password: password
      };
  
      console.log(newPost);
  
      // If we're updating a post run updatePost to update a post
      // Otherwise run submitPost to create a whole new post
      if (updating) {
        newPost.id = postId;
        updatePost(newPost);
      }
      else {
        submitPost(newPost);
      }
    });
  
    // Submits a new post and brings user to blog page upon completion
    function submitPost(Post) {
      $.post("/api/posts/", Post, function() {
        window.location.href = "/blog";
      });
    }
  
    // Gets post data for a post if we're editing
    function getPostData(id) {
      $.get("/api/posts/" + id, function(data) {
        if (data) {
          // If this post exists, prefill our cms forms with its data
          titleInput.val(data.title);
          bodyInput.val(data.body);
          postCategorySelect.val(data.category);
          // If we have a post with this id, set a flag for us to know to update the post
          // when we hit submit
          updating = true;
        }
      });
    }
  
    // Update a given post, bring user to the blog page when done
    function updatePost(post) {
      $.ajax({
        method: "PUT",
        url: "/api/posts",
        data: post
      })
        .then(function() {
          window.location.href = "/blog";
        });
    }
  });
  