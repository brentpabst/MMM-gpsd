# MMM-gpsd

Displays GPS information on a Magic Mirror

Docker Simulator:

```
docker run -t -i --name=gpsd \
-p 2947:2947 -p 8888:8888 \
knowhowlab/gpsd-nmea-simulator
```
