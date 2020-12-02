# MMM-gpsd

Magic Mirror module that displays GPS information by listening to a GPSD TCP endpoint.

_Note: Requires your device to have an active [GPSD](http://gpsd.io) deamon running with open TCP port access._

## Screenshot

![Screenshot](https://raw.githubusercontent.com/brentpabst/MMM-gpsd/main/.github/screenshot.png)

## Install

1. In your terminal, change to your Magic Mirror module directory

`cd ~/MagicMirror/modules`

2. Clone the repo

`git clone https://github.com/brentpabst/MMM-gpsd.git`

3. Make changes to MagicMirror `config.js` file

## Configuration

As with other Magic Mirror modules, load the module using a standard configuration array object.

```
modules:[
  {
    module: 'MMM-gpsd',
    position: "top_left",
      config: {
        //See 'Configuration options' for more information.
        hostname: "localhost",
        port: "2947",
      }
  },
]
```

### Options

| Option       | Description                                     | Default        |
| ------------ | ----------------------------------------------- | -------------- |
| `header`     | The header text to display                      | GPS Details    |
| `units`      | System of measure one of `metric` or `imperial` | Global Default |
| `timeFormat` | Time format to leverage one of `12` or `24`     | 12             |
| `hostname`   | The hostname of the GPSD instance               | localhost      |
| `port`       | The TCP port of the GPSD instance               | 2947           |
| `debug`      | Display full GPSD JSON data on screen           | false          |

## Development

During development you may have a need for a GPS simulator without having a full GPSD setup running locally. If that's the case you can run a simple Docker container to simplify the process.

```
docker run -t -i --name=gpsd \
-p 2947:2947 -p 8888:8888 \
knowhowlab/gpsd-nmea-simulator
```
