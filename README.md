# ✨ Markdown Links
![coverage](https://img.shields.io/badge/coverage-97%25-yellowgreen) ![version](https://img.shields.io/badge/version-1.0.0-blue)

![image](https://user-images.githubusercontent.com/97176343/170603374-0236e436-85b8-4577-adbd-a688d69e9984.png)


## 📋 Índice

* [1. Description](#1-description)
* [2. Installation](#2-installation)
* [3. Usage](#3-usage)
* [4. Author](#4-author)

***

## 1. Description
   Command line tool (CLI),that searches and reads markdown files with the purpose of granting the properties and statistics of the links.
## 2. Installation
   Install as a development dependency in your project:
   

      npm install md-links-sa / npm i md-links-sa
       
## 3. Usage
   
   
   ###  🔧 **Main command.**
    
   Execute from the application the command with the following format:
   
      md-links <path-to-file> options
       
   a)path-to-file: Absolute or relative path to the file or directory.                                                                                               
   b)options: Command that provides the orders to obtain the statistics and information of the links.                                                                               (--stats, --validate, --stats --validate)
   
   ###   🔧 **Examples**
   
   📌 **whitout option**
   
   Provides absolute path of the files markdown (*File), found link (Href) and its text (Text).
   
      md-links ./examples/folder/directory1/other-folder
         
   **file:** Show absolute path of markdown file                                                                                                                       
   **Href:** Found link.                                                                                                                                               
   **Text:** The text is displayed with a maximum of 50 characters.                                                                                                   
    
   ![image](https://user-images.githubusercontent.com/97176343/170714357-bb7a14f0-b444-46cf-8229-97a2c58dfee2.png)
   
   📌 **--validate**
   
   Provides absolute path of the files markdown (*File), found link (Href), its text (Text) and status code.
   
     md-links ./examples/folder/directory1/other-folder --validate
         
   
   **file:** Show absolute path of markdown file                                                                                                                       
   **Href:** Found link.                                                                                                                                               
   **Text:** The text is displayed with a maximum of 50 characters.                                                                                                   
   **status:** Represents "ok" if the link works or "fail" if the link does not work.                                                                                    **statuscode :** Represents a link state number.
    Also, if there is an error with the hostname or if the protocol is not http or https, a message will be displayed instead of the number.
   
   
  ![image](https://user-images.githubusercontent.com/97176343/170714542-4947887c-bff9-481d-a2b2-843fe0be2fb6.png)
   
   📌 **--stats**   
   
   Provides statistics of the total number of links(Total) and links that are not repeated(Unique).
   
    md-links ./examples/folder/directory1 --stats
   
   ![image](https://user-images.githubusercontent.com/97176343/170593744-3e30fc0c-67ba-489c-bf31-c7261d8f931c.png)
   
   📌 **--stats --validate/ --validate --stats**   
   
   Provides statistics of total links(Total), links that are not repeated (Unique) and broken links (Broken).
   
    md-links ./examples/folder/directory1 --validate --stats
           
    md-links ./examples/folder/directory1 --stats --validate
   
   ![image](https://user-images.githubusercontent.com/97176343/170602129-97d4795d-2a9e-4f8a-aa13-e52be6ba7d29.png)
   
   
## 4. Author
   ***Shiley B. Aguilar Aguilar*** (https://github.com/Shirley-Aguilar-Aguilar/LIM017-md-links)
