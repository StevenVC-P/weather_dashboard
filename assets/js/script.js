var userInput = $('#userinput');
var search = $('#search');
var pastSearch = $('#pastsearch');
var today =$("today");
var fiveDay =$("fiveday");

var searchArray = JSON.parse(localStorage.getItem("userInput")) || [];

searchArray.forEach(function (x,index){
    var buttonEl = $('<button>')
    buttonEl.addClass('apirequest')
    buttonEl.addText(searchArray[i]) //needs to pull name of city searched
});


//function to search, add call function to add to local storage
//function to add to local storage call function to build search
function addLocalStorage (){
    //located the textbox to save based on the button clicked
    var cityNameObj = $(this).siblings('userinput');
    //takes users's input, the custom data attribute of the text area, and stores it into a variable
    var cityNameIndex = cityNameObj.attr('data-index');
    //taking the value from the custom data attribute and adding it to the index of the object which the textbox sits as new key value.
    search[cityNameIndex].actText = cityNameObj.val();
    console.log(arrayTime);

    //settimeblock array to be an empty array
    localStorage.setItem("userInput", JSON.stringify(searchArray));


}












// function getApi() {
//   // fetch request gets a list of all the repos for the node.js organization
//   var requestUrl = 'https://api.github.com/orgs/nodejs/repos';

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data)
//       //Loop over the data to generate a table, each table row will have a link to the repo url
//       for (var i = 0; i < data.length; i++) {
//         // Creating elements, tablerow, tabledata, and anchor
//         var createTableRow = document.createElement('tr');
//         var tableData = document.createElement('td');
//         var link = document.createElement('a');

//         // Setting the text of link and the href of the link
//         link.textContent = data[i].html_url;
//         link.href = data[i].html_url;

//         // Appending the link to the tabledata and then appending the tabledata to the tablerow
//         // The tablerow then gets appended to the tablebody
//         tableData.appendChild(link);
//         createTableRow.appendChild(tableData);
//         tableBody.appendChild(createTableRow);
//       }
//     });
// }

// fetchButton.addEventListener('click', getApi);
