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

; How each day of the week should be displayed
daysOfWeek = "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday"
; 4 items are shown at a time
itemLimit = 4
; every 4 seconds to swap items
swapFrequency = 4000
; every 3 seconds to show an announcement
slideFrequency = 3000
; every 2 hours to refresh the page (in milliseconds)
pageRefreshFrequency = 7.2e+6
; path to the header image
slideHeadImg = "images/headlogo.png"
```
