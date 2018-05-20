# gs-ccb-events
Single-page site to display a current events feed using the CCB API

There are two views available:
/#/list
/#/list-with-slides

### Configuration

A ccb-events.conf file with these properties is required:

```
[CCB]
ccb_church="yourchurch"
ccb_user="yourAPIuser"
ccb_pass="yourAPIpass"

; look ahead X days from today to pull events
days_ahead = 14
; how each day of the week should be displayed
days_of_week = "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday"
; 4 items are shown at a time
item_limit = 4
; every 4 seconds to swap items
swap_frequency = 4000
; every 3 seconds to show an announcement
slide_frequency = 3000
; every 2 hours to refresh the page (in milliseconds)
page_refresh_frequency = 7.2e+6
; full path to the folder where the slider images are
slide_img_path = "C:\some\path\to\slide\images"
```

### Slider images
Slider images can be png, jpeg, jpg or gif.  
They can sit anywhere on the system. They will be copied into `images/announcements` as long as the conf setting `slide_img_path` is the absolute path to the folder where the slide images are.  
