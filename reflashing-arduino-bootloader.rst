.. title: Arduino alglaadur
.. tags: 
.. date: 2013-10-31

Sissejuhatus
------------

Pea igal Atmega mikrokontrolleril on ICSP (In Circuit Serial Programming) liides.
See oli enne Arduinot primaarne Atmega mikrokontrollerite programmeerimise viis.

C koodi kompileerimine Arduino Uno jaoks on üpris hõlbus:

.. code:: bash

    avr-gcc -c -g -mmcu=atmega328p main.c main.o
    avr-gcc -g -mmcu=atmega328p -Wl,-Map,main.map main.o -o main.out
    avr-objcopy -j .text -j .data -O ihex main.out rom.hex
    avrdude -p atmega328p -c buspirate -P /dev/ttyUSB2 -e -Uflash:w:rox.hex

Tehase fusebittide seadmine
---------------------------

Atmel ATmega328p vaikimisi fuse-bitide seadmine (1MHz sisemine kvarts):

.. code:: bash
    
    avrdude -p atmega328p -c buspirate -e -U lfuse:w:0x62:m -U hfuse:w:0xD9:m -U efuse:w:0x7:m -e -U lock:w:0xFF:m  -P /dev/ttyUSB2
    
Arduino alglaaduri taastamine
-----------------------------

Selleks et Atmega mikrokontroller jälle Arduino arenduskeskkonnast programmeeritavaks
teha peab mirkokontrollerisse tagasi kirjutama Arduino alglaaduri, mis üle
jadaliidese arvutiga suhtleb:
    
.. code:: bash

    avrdude -p m328p -c buspirate -P /dev/ttyUSB2 -b 115200 -F -U /usr/share/arduino/hardware/arduino/bootloaders/atmega/ATmegaBOOT_168_atmega328.hex

Viited
------

* `Programming the Atmega328p using AVRDUDE and the Bus Pirate
  <http://code.google.com/p/ardupilot-mega/wiki/BusPirate>`_
* `atmeg324p/Makefile
  <https://bitbucket.org/lauri.vosandi/atmega324p/src/tip/Makefile>`_

