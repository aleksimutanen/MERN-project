# Ohjeet ja tuntikirjanpito

# Ohjeet
Sovellus on sinänsä hyvinkin yksinkertainen. Se on tehty näyttämään omistavan yrityksen projekteja 
tai ylipäätään kohteita, kuvia ja tietoa niistä. Sivustolla ei siis ole tarkoitus kirjautua sisään 
normaalina vierailijana. Aikaisemmin teki mieli piilottaa Login navigaatiosta kokonaan, mutta tässä 
demossa se on kuitenkin näkyvillä. Käyttäjätunnukset ovat vain omistajille, joilla pääsee muokkaamaan ja 
lisäämään tietoa. Normaalisti sivulla vieraileville mikään lisääminen/muokkaaminen/poistaminen ei ole näkyvillä.


username: user 

password: pass

Normaalikäyttäjä, jolla pääsee lisäämään ja muokkaamaan projekteja/kohteita ylipäätään.


username: admin 

password: pass

Adminkäyttäjä, jolla voi muokata ja lisätä myös työntekijöitä ja muokata yrityksen tietoja, logoa ja kuvia.



# Tuntikirjanpito

Joissain kohdissa tarkempia viestejä tekemisistä löytyy myös commiteista.

| Päivä | Aika(h) | Kuvaus mitä tein 
|-------|----------|-----------------
| 18.07  |   1      | INIT github 
| 18.07  |   1      | Testing schemas to figure out whether to use TS or JS
| 20.07  |   2      | Interfaces implementation testing with Mongoose schemas
| 20.07  |   1      | Configuring discrimination for mongoose schemas
| 20.07  |   3      | Schema structuring and basic functionality for GET & POST
| 20.07  |   2      | Init frontend and testing more backend stuff
| 21.07  |   1      | Initial redux and router for frontend
| 21.07  |   2      | Form for project adding
| 21.07  |   2      | Basic bootstrap for frontend
| 21.07  |   3      | CSS for header, form structuring
| 21.07  |   2      | Modal and collapsible bootstrap components testing
| 22.07  |   3      | Grid 3 in a row, image scaling
| 22.07  |   4      | Configuring file upload, single project presentation
| 23.07  |   3      | Configuring Multer for image uploading
| 23.07  |   4      | Configuring image api endpoints, binary to blob conversion
| 23.07  |   3      | Image array matching with uploaded image file names
| 23.07  |   1      | Support for multiple file uploading
| 24.07  |   4      | Login Formik, project form to Formik as well
| 24.07  |   4      | Form state to redux, form types added
| 25.07  |   3      | Heroku testing, some css, page indexing to redux
| 25.07  |   1      | React hashrouter testing
| 25.07  |   2      | Shortcuts for heroku deploying, pagination, more hashrouter testing
| 26.07  |   3      | Grid system mods to support uneven % 6 projects count
| 26.07  |   1      | Less messy version of grid
| 26.07  |   2      | Login for frontend
| -  |    -     |   -
| 27.07  |   2      | More login for frontend and backend
| 27.07  |   2      | Project updating support
| 27.07  |   2      | New version for update
| 27.07  |   1      | Refactoring for project form
| 27.07  |   3      | Employees to redux, employees/contact page started
| 28.07  |   2      | Project listing refactoring, statusfield for projects and forms
| 28.07  |   2      | Schema mods for employee, company info schema for later update support
| 28.07  |   2      | Testing navbar layouts
| 28.07  |   2      | Started carousel for home page, company info to redux
| 28.07  |   3      | Form for adding employees
| 28.07  |   1      | Update form for employees
| 29.07  |   3      | Filter to redux, improving project pagination system. Sort by to project listing
| 29.07  |   2      | Fonts testing. Dynamic field displaying to project page regardless of schema
| 29.07  |   1      | Testing with 4x the projects count, this system is getting too slow
| 29.07  |   3      | Converting image holding to Mongo
| 29.07  |   3      | Continuing image conversion
| 30.07  |   2      | Buffer array to b64 to blob
| 30.07  |   1      | DB images testing and build
| 30.07  |   1      | 4x entry count testing on new system
| 30.07  |   4      | Adding jwt verification to to critical endpoints. More performance testing. Testing styles
| 30.07  |   2      | Some frontend refactoring. Debugging my .env problem/fuckup
| 31.07  |   2      | Debugging heroku .env variables being undefined. They are in heroku config for now
| 31.07  |   4      | CSS redesigning. Debugging extremely slow Mongo performance
| 31.07  |   3      | More CSS, page layout changing
| 01.08  |   2      | More CSS and design
| 01.08  |   3      | Going back to backend image fetching. Continue on CSS and page layout
| 01.08  |   2      | Navbar styling and layout
| 01.08  |   2      | More navbar styling and CSS
| 01.08  |   1      | Pagination styling. Navbar styling
| 02.08  |   2      | Button CSS and other styling
| 02.08  |   4      | Form input CSS. It seems difficult to change some default values
| 02.08  |   2      | Pagination button styles. Contact page started. Form styles. Info model has image and different structure
| 02.08  |   2      | Info has logo now. Started some fade animations
| -  |    -     |   -
| 03.08  |   3      | Started some perfomance optimization by reducing project images to 1 in init. Rest are loaded in single project page. Slider animation
| 03.08  |   4      | Fade effects. Footer and styles. Relevant field for projects and some mobile testing
| 03.08  |   1      | CSS and placement for navbar and the logged in user
| 03.08  |   2      | CSS and design for navbar. Changed displayed fields in gallery. Fixed filter bugs
| 04.08  |   4      | Small CSS changes. Notification for actions. Images existence validation in project form
| 04.08  |   4      | Some user validation for critical form pages. Fixed small issue when going to project form from a low y axis location. Figuring out how to reset forms smartly
| 04.08  |   1      | Working form clearing based on how successful the action was
| 04.08  |   1      | Existing values are set to fields when opening update project form
| 04.08  |   2      | Same but for employees form. History routing added to actions to reroute to somewhere
| 05.08  |   4      | HTTPS config. Propably a waste of time but it was educational.
| 05.08  |   4      | Remove functionality for projects and employees. Forms have disabled image inputs if checkbox isnt checked. Dynamic visibility for stuff that only admin/user can see
| 05.08  |   2      | Some small code cleaning. Started form for company info and logo update
| 06.08  |   2      | Company info form and api endpoints
| 06.08  |   4      | Refactoring started. Trying to create a grid system where user can specify dimensions
| 06.08  |   3      | Page division works with a given variable now. Trying to figure out how to pass modifiable component as children
| 06.08  |   3      | Refactoring some variables to router. More refactoring. Started older projects data page
| 07.08  |   4      | Google maps api configuring and js started
| 07.08  |   3      | More Google maps. Trying to configure an item to gallery where user can see older projects
| 07.08  |   3      | Added coordinates to info model. Continue older project data displaying. Coords to info form
| 07.08  |   1      | Coords now works in form updating
| 08.08  |   2      | Older project data page continues. Minor small stuff
| 08.08  |   1      | Started to write README and instructions. Seeing my old ramblings make me facepalm
| 08.08  |   1      | More bookkeeping and README
| 08.08  |   1      | More of the same...
| 08.08  |   2      | Removing some useless functionality since I got the hang of .envs on frontend. Removed clogs from production. Testing uploading on my phone
| 08.08  |   1      | Started to work on search bar
| 09.08  |   2      | Continue work on search bar
| 09.08  |   2      | Continue on search. Changed public index.html title and icon in frontend
| 09.08  |   3      | Fixing my broken search functionality. Icon for mobile browsing changed. Tried one last time to override certain Bootstrap CSS but NOPE
| 09.08  |   0      | Writing an email and wasting time
|  - |    -     |   -
| yhteensä  |   201      | 
