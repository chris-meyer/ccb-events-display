# CCB Church Events Dashboard
Single-page site to display a current events feed using the CCB API.  
The events are pulled from the [church-wide calendar](https://churchcommunitybuilder.force.com/s/article/2040889) of your CCB instance.  

## Events-Only View
Route: /#/list  
This view shows just a rotating list of the events.

## Events and Announcements View
Route: /#/list-with-slides  
This view shows a rotating list of the events as well as a rotating set of
announcement slides.

## Setup

### CCB Church API User

### Web Server Installation

### Slider images
Slider images can be png, jpeg, jpg or gif.  
They can sit anywhere on the system. They will be copied into `images/announcements` as long as the configuration setting **Slider Path** is the absolute path to the folder where the slider images are.  
The `images/announcements` folder is automatically created on the first run of the list-with-slides route.

The order of the slider is based on the filename, so name the files in the sequence you would like them to be shown.
For example, Slider1.jpg, Slider2.jpg, etc...  

One way to reduce work of maintaining the slider images would be to point **Slider Path** to a folder that is synced with a storage service like Google Drive or Dropbox.  

To refresh the slider images to a new set, delete the `images/announcements` folder and reload the page.

### Configuration


## Dependencies
This project uses these third-party libraries:
* AngularJS 1.4.9
* Bootstrap 3.3.7
* jQuery 2.2.4
