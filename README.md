# freeCode Camp API and Microservices Challenges

### Projects & Microservices Challenges

* [Timestamp Microservice](#API-Project:-Timestamp-Microservice-for-FCC)
* [Request Header Parser Microservice](#API-Project:-Request-Header-Parser-Microservice-for-freeCodeCamp)
* [URL Shortner Microservice](#API-Project:-URL-Shortner-Microservice-for-freeCodeCamp)
* [Excercise Tracker](#API-Project:-Excercise-Tracker-REST-API)
* [File Metadata Microservice](#API-Project:-File-Metadata-Microservice-for-freeCodeCamp)

## API Project: Timestamp Microservice for FCC

### User stories :

1. The API endpoint is `GET [project_url]/api/timestamp/:date_string?`
2. A date string is valid if can be successfully parsed by `new Date(date_string)` (JS) . Note that the unix timestamp needs to be an **integer** (not a string) specifying **milliseconds**. In our test we will use date strings compliant with ISO-8601 (e.g. `"2016-11-20"`) because this will ensure an UTC timestamp.
3. If the date string is **empty** it should be equivalent to trigger `new Date()`, i.e. the service uses the current timestamp.
4. If the date string is **valid** the api returns a JSON having the structure 
`{"unix": <date.getTime()>, "utc" : <date.toUTCString()> }`
e.g. `{"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}`.
5. If the date string is **invalid** the api returns a JSON having the structure `{"unix": null, "utc" : "Invalid Date" }`. It is what you get from the date manipulation functions used above.

#### Example usage:
* https://curse-arrow.hyperdev.space/api/timestamp/2015-12-15
* https://curse-arrow.hyperdev.space/api/timestamp/1450137600000

#### Example output:
* { "unix": 1450137600, "natural": "December 15, 2015" }

## API Project: Request Header Parser Microservice for freeCodeCamp

### User Stories :

1. I can get the IP address, preferred langauges (from header `Accept-Languag`) and system infos(from header `User-Agent`) fro my device

#### Example Usage:

* [base_url]/api/whoami

#### Example Output:

* `{"ipaddress":"159.20.14.100","language":"en-US,en;q=0.5","software":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"}`

## API Project: URL Shortner Microservice for freeCodeCamp

### User Stories

1. I can POST a URL to `[project_url]/api/shorturl/new` and I will recieve a shortened URL in the JSON Response. Example: `{"original_url": "www.google.com", "short_url": 1}`
2. If I pass an invalid URL that doesn't follow the valid `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error like {"error": "invalid URL"}. *Hint*: to be sure that the submitted url points to avalid sit you can use the function dns.lookup(host, cb) from the `dns` core module.
3. When I visit the shortened URL, it will redirect me to my original link.

#### Creation Example

POST [project_url]/api/shorturl/new - body (urlencoded) : url=[https://google.com]

##### Usage:

[this_project_url]/api/shorurl/3

##### Will redirect to:

http://forum.freecodecamp.com


## API Project: Excercise Tracker REST API

#### A microservice project, part of Free Code Camp's curriculum

### User Stories

1. I can create a user by posting form data username to /api/exercise/new-user and returned will be an object with username and _id.
2. I can get an array of all users by getting api/exercise/users with the same info as when creating a user.
3. I can add an exercise to any user by posting form data userId(_id), description, duration, and optionally date to /api/exercise/add. If no date supplied it will use current date. Returned will the the user object with also with the exercise fields added.
4. I can retrieve a full exercise log of any user by getting /api/exercise/log with a parameter of userId(_id). Return will be the user object with added array log and count (total exercise count).
5. I can retrieve part of the log of any user by also passing along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)

## API Project: File Metadata Microservice for freeCodeCamp

### User stories:

1. I can submit a form that includes a file upload.
2. The form file input field has the "name" attribute set to "upfile". We rely on this in testing.
3. When I submit something, I will recieve the file name and size in bytes within the JSON response.

### Usage:

* Go to the main page, and upload a file using the provided form.

### Hint:

* To handle the file uploading you should use the [multer](https://www.npmjs.com/package/multer) NPM package.