# Maker

## Development 

### Overview
Makers is a Web Application with a strict seperation from Front-End and Back-End.  

The front-end of Makers is a React WebPack HTML5 Application. 

The back-end of Makers is a Java Springs Application.  

The development environment does it's best to make the entire stack work as a single deplorable application with little needed from the developer, however this is not always the case.   The below will endevor to declare the proper development environment and it's setup, allowing for a "Nice and Easy" developer experience. 

Additional Reading to help understand some of the tool chains being used here 
- React, WebPack, Babel - https://www.valentinog.com/blog/babel/
- Spring #TODO 

### Environment Setups
#### Mac Development Station Setup
##### Overall Requirements 
###### Required
 1. Mac Running 10.14+ [Currently Tested on upto 10.5 Beta 5]
2. Brew Installed (https://brew.sh/)
3. XCode Installed (https://developer.apple.com/xcode/)
4. XCode Command Line Tools (CLT) )(https://developer.apple.com/download/more/?=for%20Xcode)
5. Docker Installed (https://docs.docker.com/docker-for-mac/install/)
6. MySQL Docker Image Installed (https://hub.docker.com/_/mysql)
7. IntelliJ 2019.2+ (https://www.jetbrains.com/idea/download/)
8. Yarn (Installed from Brew) 
        
        brew install yarn

9. Maven (Installed from Brew) 
        
        brew install maven

###### Optional
1. Docker Options 
   1. Kitematic via Docker to make container administration easier (https://kitematic.com/)
2. IntelliJ Options
   1. JRebel for auto spring deployments into the server (https://jrebel.com/software/jrebel/download/) 
3. MacOs Options
   1. Iterm2 (Cause you really shouldn't be using any other Terminal on MacOS) (https://www.iterm2.com/downloads.html)
   2. On My Zsh (Cause You Should be Using ZSH - and ZSH Needs On My Zsh) (https://ohmyz.sh/) 

##### Database
Storage is provided by a MySQL Database.   For local development, the recommendation is a local mysql running via Docker 

### Building and Running Things Manually 

#### The Front-End
The front-end can be initially build and ran from the command line via a couple of simple Yarn commands. 

##### Getting The Modules
Installing the modules needed for the system is as simple as running `yarn install`
The output should look close to this 

        ➜  Maker git:(master) ✗ yarn install      
        yarn install v1.17.3
        [1/4] 🔍  Resolving packages...
        [2/4] 🚚  Fetching packages...
        [3/4] 🔗  Linking dependencies...
        [4/4] 🔨  Building fresh packages...
        ✨  Done in 3.82s.
        ➜  Maker git:(master) ✗         

##### Running The Frontend Dev Server
Once you have all of the modules installed and happy, running the live-reload frontend development server is as simple as 
running `yarn start-dev` which should then looks like this 
        
        ➜  Maker git:(master) ✗ yarn start-dev
        
        yarn run v1.17.3
        $ webpack-dev-server --color --mode development
        ℹ ｢wds｣: Project is running at http://localhost:9001/
        ℹ ｢wds｣: webpack output is served from /
        ℹ ｢wds｣: Content not from webpack is served from /Users/jmaes/Projects/LocalWIP/Code/Maker/dist
        ℹ ｢wdm｣: wait until bundle finished: /
        ℹ ｢wdm｣: Hash: fc8d18984b4bdacb5c01
        Version: webpack 4.39.2
        Time: 1044ms
        Built at: 08/18/2019 6:07:44 PM
               Asset       Size  Chunks             Chunk Names
        ./index.html  623 bytes          [emitted]  
             main.js   1.42 MiB    main  [emitted]  main
        Entrypoint main = main.js
        [0] multi (webpack)-dev-server/client?http://localhost:9001 ./src/main/react/index.jsx 40 bytes {main} [built]
        [./node_modules/ansi-html/index.js] 4.16 KiB {main} [built]
        [./node_modules/ansi-regex/index.js] 135 bytes {main} [built]
        [./node_modules/html-entities/index.js] 231 bytes {main} [built]
        [./node_modules/strip-ansi/index.js] 161 bytes {main} [built]
        [./node_modules/webpack-dev-server/client/index.js?http://localhost:9001] (webpack)-dev-server/client?http://localhost:9001 4.29 KiB {main} [built]
        [./node_modules/webpack-dev-server/client/overlay.js] (webpack)-dev-server/client/overlay.js 3.51 KiB {main} [built]
        [./node_modules/webpack-dev-server/client/socket.js] (webpack)-dev-server/client/socket.js 1.53 KiB {main} [built]
        [./node_modules/webpack-dev-server/client/utils/createSocketUrl.js] (webpack)-dev-server/client/utils/createSocketUrl.js 2.85 KiB {main} [built]
        [./node_modules/webpack-dev-server/client/utils/log.js] (webpack)-dev-server/client/utils/log.js 964 bytes {main} [built]
        [./node_modules/webpack-dev-server/client/utils/reloadApp.js] (webpack)-dev-server/client/utils/reloadApp.js 1.59 KiB {main} [built]
        [./node_modules/webpack-dev-server/client/utils/sendMessage.js] (webpack)-dev-server/client/utils/sendMessage.js 402 bytes {main} [built]
        [./node_modules/webpack/hot sync ^\.\/log$] (webpack)/hot sync nonrecursive ^\.\/log$ 170 bytes {main} [built]
        [./src/main/react/components/container/FormContainer.jsx] 3.64 KiB {main} [built]
        [./src/main/react/index.jsx] 69 bytes {main} [built]
            + 35 hidden modules
        Child html-webpack-plugin for "index.html":
             1 asset
            Entrypoint undefined = ./index.html
            [./node_modules/html-webpack-plugin/lib/loader.js!./src/main/react/templates/index.html] 625 bytes {0} [built]
        ℹ ｢wdm｣: Compiled successfully.
       
At this point the server is running and it should have opened your local browser and will be showing you the contents of the 
dist directory.  The options that control the behavior of the webpack-development server are found in two places in your config. 

1. webpack.config.js
2. package.json

webpack.config.js contains a `devServer` section which outlines the configuration for the server that you are starting 
 
           devServer:
           {
              contentBase: path.join(__dirname, 'dist'),
              compress: true,
              port: 9001,
              open: true,
              liveReload: true
           }, 

package.json contains the definition of the script (which is what you are calling on the command line with the Yarn command 
above `yarn start-dev`) and also defines the few parameters which can not be defined in the configuration file

         "scripts": {
              "start-dev":   "webpack-dev-server --color --mode development"
           },

#### The Back-End 
The backend of the server is a Java Spring application which provides a series of RestAPI endpoints for the front-end of the 
application to interact with.  The manual build environment for the backend is a provided by Maven. 
