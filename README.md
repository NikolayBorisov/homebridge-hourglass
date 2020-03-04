
# Hourglass Timer Plugin for Homebridge

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
