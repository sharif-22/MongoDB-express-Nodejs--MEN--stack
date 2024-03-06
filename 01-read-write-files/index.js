const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// fs methods are Async methods
fs.readFile("./README.md", "utf8", (error, data) => {
  if (error) {
    console.log(`Err Code : ${error.code}, Err Msg :${error.message} `);
  }
  console.log(`README : ${data}`);
});

// to catch a uncaught err we can use
process.on("uncaughtException", (error) => {
  console.error(`Err Code : ${error.code}, Err Msg :${error.message} `);
  //Calling process.exit() will force the process to exit as quickly as possible
  //even if there are still asynchronous operations
  process.exit(1); // code : 1 -> to exit process ; code : 0 -> success
});

// write a doc using fs
fs.writeFile(
  path.join(__dirname, "writeFile.js"),
  "console.log(`hello nodeJS`)",
  (error) => {
    if (error) {
      console.log(`Err Code : ${error.code}, Err Msg :${error.message} `);
    }
    console.log("successfully Created writeFile.js in the Root");
  }
);

// > TASK :fill data in  data.js file in fileOps 📂
// 1 : write your details like : name, education, age, and github url
// 2 : append your skills
// 3 : log the details you metioned above
// 4 : rename data.js -> task.js

// we can achieve the above task in two methods one is callback hell ()=>=>=> and Promise (async)

// Call backhell : writeFile()=>( appendFile()=>( rename()=>() ))
fs.writeFile(
  path.join(__dirname, "fileOps", "data.js"),
  `const name = 'sharif'; \nconst education = 'B.C.A'; \n let age = 22; \n const gitUrl = 'https://github.com/sharif-22';`,
  (error) => {
    if (error) {
      console.log(`Err Code : ${error.code}, Err Msg :${error.message} `);
    }
    console.log("successfully write file  in fileOPs");
    // append Skills data
    fs.appendFile(
      path.join(__dirname, "fileOps", "data.js"),
      "\nconst skills = ['Javascript','NodeJS','React'];",
      (error) => {
        if (error) {
          console.log(`Err Code : ${error.code}, Err Msg :${error.message} `);
        }
        console.log("append the content to the existing file ");

        fs.rename(
          path.join(__dirname, "fileOps", "data.js"),
          path.join(__dirname, "fileOps", "task.js"),
          (error) => {
            if (error) {
              console.log(
                `Err Code : ${error.code}, Err Msg :${error.message} `
              );
            }
            console.log("renamed existing file ");
          }
        );
      }
    );
  }
);
// to avoid this callback hell we can use Promise methods in nodeJS
const fileOps = async () => {
  try {
    const readTask = await fsPromises.readFile(
      path.join(__dirname, "fileOps", "task.js"),
      "utf8",
      (error, data) => {
        if (error) {
          console.log(`Err Code : ${error.code}, Err Msg :${error.message} `);
        }
        console.log(data);
      }
    );

    await fsPromises.writeFile(
      path.join(__dirname, "fileOps", "PromiseTask.js"),
      readTask,
      "utf8",
      (error) => {
        if (error) {
          console.log(`Err Code : ${error.code}, Err Msg :${error.message} `);
        }
      }
    );

    await fsPromises.appendFile(
      path.join(__dirname, "fileOps", "PromiseTask.js"),
      "\n\n //this data append from task.js",
      "utf8",
      (error) => {
        if (error) {
          console.log(`Err Code : ${error.code}, Err Msg :${error.message} `);
        }
      }
    );
  } catch (error) {
    console.log(`Err Code : ${error.code}, Err Msg :${error.message} `);
  }
};

const deleteFile = async () => {
  await fsPromises.unlink("./delete.js");
};
// deleteFile();

fileOps();

// if the folder not existing then create the folder
if (!fs.existsSync(path.join(__dirname, "MKDIR"))) {
  // to create Folder
  fs.mkdir(path.join(__dirname, "MKDIR"), (error) => {
    if (error) {
      console.log(error);
    }
  });

  setTimeout(() => {
    // if the folder existing then remove the folder
    if (fs.existsSync(path.join(__dirname, "MKDIR"))) {
      // to create Folder
      fs.rmdir(path.join(__dirname, "MKDIR"), (error) => {
        if (error) {
          console.log(error);
        }
      });
    }
  }, 5000);
}
