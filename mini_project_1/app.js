import readline from "readline";
const rl = readline.createInterface({
  input: process.stdin,
    output: process.stdout,
})
const todos = [];

const showMenu = () => {
  console.log("1: Add Todo");
  console.log("2: view Todo");
  console.log("3: Delete Todo");
  console.log("4: Exit");

  rl.question("Select an option: ", handleInput);
}
const handleInput = (input) => {
    if (input === "1") {
        rl.question("Enter a todo: ", (todo) => {
            todos.push(todo);
            console.log(`Todo added: ${todo}`);
            showMenu();
        });

    }  else if (input === "2") {
        console.log("\n Your Todos Lists: ");
        todos.forEach((todo, index) => {
            console.log(`${index + 1}: ${todo} \n ----------------`);
        });
        showMenu();
    } else if (input === "3") {
        rl.question("Enter the index of the todo to delete: ", (index) => {
            if (index > 0 && index <= todos.length) {
                const deletedTodo = todos.splice(index - 1, 1);
                console.log(`Todo deleted: ${deletedTodo}`);
                showMenu();
            } 
            else {
                console.log("Invalid index");
                showMenu();
            }
        });
        showMenu();
    } else if (input === "4") {
        console.log("Exiting the program. Goodbye!");
        rl.close();
    } else {
        console.log("Invalid option. Please try again.");
        showMenu();
    }
}
showMenu();