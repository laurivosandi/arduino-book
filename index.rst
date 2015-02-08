.. author: Lauri Võsandi <lauri.vosandi@gmail.com>
.. license: cc-by-3
.. tags: Tiigriülikool, Arduino, Estonian IT College, Fritzing, Atmel
.. date: 2013-10-31

Arduino
=======

Sissejuhatus
------------

.. image:: http://www.eitsa.ee/files/2012/05/TiigriYLIKOOL_lauseta.gif
    :align: right

Käesolev õppematerjal on ette nähtud kasutamiseks täiendava
materjalina Eesti IT Kolledži õppeaines 
`Riistvaralähedane programmeerimine <http://enos.itcollege.ee/~amulin/>`_.

IT Kolledži robootikaklubis on 26tk Arduino Mega 2560 plaati ning sellele
ettenähtud lisasid kättesaadavad kõigile kes sooritavad nimetatud õppeaine praktikume.
Käesoleva lehe eesmärgiks on kokku koguda oskusteave IT Kolledži robootikaklubi
varustuse kohta. Materjalid on valminud
Hariduse Infotehnoloogia Sihtasutuse programmi Tiigriülikool toel.

Hoolimata sellest leiab siit palju kasulikku kodumaist lugemist teooria ja
erinevate elektroonikakomponentide kohta.
`IT Kolledži robootikaklubi <http://robot.itcollege.ee/>`_ on alati avatud
uudishimulikele, kes soovivad näiteks trükkplaati söövitada või
jootekolbi kasutada. Selleks ei pea isegi robootikaklubi liige olema.


Teemad
------

Elektroonika alused:

* `Takistus, pinge, vool, võimsus, energia, mahutavus <resistor.html>`_
* `Diood <diode.html>`_
* `Valgusdiood <led.html>`_
* `Valgusdioodi skeemisimulaator <led-simulator.html>`_

Arduino:

* `Arduino Uno <arduino-uno.html>`_
* `Arduino Mega 2560 <arduino-mega-2560.html>`_
* Jadaliides ²
* `Digitaalväljund <digital-outputs.html>`_
* `Digitaalsisend <digital-inputs.html>`_
* `Analoogsisend <analog-inputs.html>`_
* `Katkestused <interrupts.html>`_
* Taimerid ²
* `Pulsilaiusmodulatsioon <pwm-simulator.html>`_
* `Loogika olekud <logic-values.html>`_

Sensorid:

* `Infrapuna kaugusandur Sharp GP2Y0A21 <proximity-sensor.html>`_
* `Infrapuna peegeldussensor Pololu QTR-1A <http://www.pololu.com/product/958>`_

Täiturid:

* `Servomootor <servo-motors.html>`_.
* `Segmentdisplei juhtimine <segment-display-simulator.html>`_.
* `Transistor <transistor.html>`_, võimsamate seadmete juhtimine.
* RGB LED-i juhtimine `ULN2803 <uln2803.html>`_ abil.
* `Väljatransistor <mosfet.html>`_, eriti võimsate seadmete juhtimine. 
* `H-sild <h-bridge-simulator.html>`_, mootori juhtimine mõlemas suunas.
* Alalisvoolumootorite juhtimine `SN754410 <sn754410.html>`_ abil.

Arduino shieldide kasutamine:

* `LCD1602 key shield <lcd1602-key-shield.html>`_
* `Nokia 5110 LCD shield <nokia-5110-lcd-shield.html>`_
* `Sumoino <https://github.com/silps/sumoino/>`_ sumoroboti *shield*

Arduino Wireless shieldiga ühilduvad moodulid:

* `XBee S2 mooduliga <zigbee.html>`_
* `Bluetooth Bee <http://www.seeedstudio.com/wiki/Bluetooth_Bee>`_


Muu
---

Fritzing jooniste värvuste tähendused, juhul kui pole teistmoodi märgitud:

* Must - Maa
* Punane - 5V toide
* Kollane - 12V toide
* Oranž - pulsslaiusmodulatsiooni signaal (0-5V)
* Roheline - pulsslaiusmoduleeritud toitepinge (0-12V)


Viited
------


Analoogset sisu leiab veel:

* `Skeemipesa <http://www.skeemipesa.ee/>`_ on blogi, mis tutvustab Eestis ja mujal maailmas tehtud elektrotehnilisi projekte ning ideid.
* `Hobilabor <http://www.hobilabor.ee/>`_ on tehnoloogia, disaini ja kunsti blogi
* `Eesti IT Kolledži robootikaklubi <http://robot.itcollege.ee/>`_ on alati avatud uudishimulikele
* `Eesti IT Kolledži inventar <eitc-inventory.html>`_

Õppematerjali lähtekood:

* `lauri.vosandi/electronics-book - Bitbucket <https://bitbucket.org/lauri.vosandi/electronics-book>`_
