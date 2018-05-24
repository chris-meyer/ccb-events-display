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
An administrator of your CCB Church instance will need to create an API user.  
This user will be used for this app to pull events from your instance via the public API.  

Reference: https://churchcommunitybuilder.force.com/s/article/640595

### Web Server Installation
This application was designed to run on an [Apache](https://httpd.apache.org) server with [PHP](http://www.php.net/). An all-in-one tool like [XAMPP](https://www.apachefriends.org/index.html) is probably fine to use if you don't want to fiddle with configuration settings.  

Once you have the web server set up, clone or download the latest version to the Apache web root.

### Slider images
Slider images can be png, jpeg, jpg or gif.  

They can sit anywhere on the system. They will be copied into `images/announcements` as long as the configuration setting **Slider Path** is the absolute path to the folder where the slider images are (see below).  
The `images/announcements` folder is automatically created on the first run of the list-with-slides route.

When the app pulls the images for display, it sorts them by filename in ascending order (i.e. Slider_1.jpg, Slider_2.jpg, Slider_3.jpg will be shown in that order). So, to set the order of the slider, the images will need to have filenames in alphabetical/numeric order.

To remove sliders, just take them out of the **Slider Path** folder.  
One way to reduce work of maintaining the slider images would be to point **Slider Path** to a folder that is synced with a storage service like Google Drive or Dropbox.  

To refresh the slider images to a new set, delete the `images/announcements` folder and reload the page.

### Configuration
Go to the /#/conf route to configure the app. The settings are explained on that page.  
Once the settings are saved, a file ccb-events.conf is created.  
You can then select the "List" or "List with Slides" view using one of the options at the top of the page.  

## Dependencies
This project uses these third-party libraries:
* AngularJS 1.4.9
* Bootstrap 3.3.7
* jQuery 2.2.4
