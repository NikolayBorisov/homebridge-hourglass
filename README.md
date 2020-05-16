
# Hourglass Timer Plugin for Homebridge

For Advanced HomeKit Shortcuts Automation

```
npm install homebridge-hourglass
```

Now you can choose type of your hourglass!

<img src="https://raw.githubusercontent.com/NikolayBorisov/homebridge-hourglass/master/demo.gif">

Example config.json:

```
    "accessories": [
        {
          "accessory": "Hourglass",
          "name": "My Hourglass 1",
          "tick": 500,
          "step": 10,
          "type": "bulb"
        },
        {
          "accessory": "Hourglass",
          "name": "My Hourglass 2",
          "tick": 5000,
          "type": "fan"
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

## Log & Debug

To enable verbose logging

```
    "accessories": [
        {
          ...
          "log": true
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
