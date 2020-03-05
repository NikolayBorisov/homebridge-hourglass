
# Hourglass Timer Plugin for Homebridge

For Advanced HomeKit Shortcuts Automation

```
npm install homebridge-hourglass
```

<img src="https://raw.githubusercontent.com/NikolayBorisov/homebridge-hourglass/master/demo.gif">

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
