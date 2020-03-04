
# Hourglass Timer Plugin for Homebridge

For Advanced HomeKit Shortcuts Automation

<img src="https://github.com/NikolayBorisov/homebridge-hourglass/blob/master/demo.gif?2" height="700">

Example config.json:

```
    "accessories": [
        {
          "accessory": "Hourglass",
          "name": "My Hourglass 1",
          "tick": 500,
          "step": 10
        }   
    ]

```


## Resume After Stop

You can do this by passing an argument in your config.json:

```
    "accessories": [
        {
          "accessory": "Hourglass",
          "name": "My Hourglass 1",
          "resumeAfterStop": true
        }
    ]

```

## Reverse Hourglass

NOT YET IMPLEMENTED

This can be done by passing the 'reverse' argument in your config.json:

```
    "accessories": [
        {
          "accessory": "Hourglass",
          "name": "My Hourglass 1",
          "reverse": true
        }   
    ]

```
