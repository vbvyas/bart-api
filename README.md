# BART NextUp API

BART NextUP API powering [PebbleNextUpHack](https://github.com/kevd1337/PebbleNextUpHack) app

![Screenshot](http://showhackstest.s3.amazonaws.com/detail_1407092908952.jpg)

NextUp - Is a Pebble app that helps you to find transit information for stations near you.

Created for YC Hacks 2014:
* [NextUp ShowHacks Detail Page](http://www.showhacks.com/p/eJUihHUUMx)
* [NextUp Challenge Post Submission](http://ychacks.challengepost.com/submissions/25729-next-up)


# API Usage

To get station information:

    http://nextup-bart-hack.herokuapp.com/station/{station_code}

To get stations near GPS coordinates:

    http://nextup-bart-hack.herokuapp.com/stations?lat={latitude}&lng={longitude}

Live URL examples:
* [http://nextup-bart-hack.herokuapp.com/station/cols](http://nextup-bart-hack.herokuapp.com/station/cols)
* [http://nextup-bart-hack.herokuapp.com/stations?lat=37.699&lng=-122.29](http://nextup-bart-hack.herokuapp.com/stations?lat=37.699&lng=-122.29)

To run locally:

    git clone https://github.com/vbvyas/bart-api.git
    cd bart-api
    npm install
    node app.js
