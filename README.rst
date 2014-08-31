================
Electronics book
================

Introduction
============

This is a collection of Estonian-written Arduino study materials funded by
`Tiger University program <http://www.eitsa.ee/en/activities/tiger-university/>`_ of
`Information Technology Foundation for Education <http://www.eitsa.ee/en/>`_ in Estonia.

.. image:: http://www.eitsa.ee/files/2012/05/TiigriYLIKOOL_lauseta.gif

All sources are released under `Creative Commons Attribution-ShareAlike 3.0
<http://creativecommons.org/licenses/by/3.0/>`_ license.

Using this repository
=====================

The sources are composed of mainly: reStructuredText files,
Fritzing schematics, unscaled photos and Scalable Vector Graphics.

If you just want to read the materials and use circuit simulators, please use
preprocessed sources at `Lauri's blog <http://lauri.vosandi.com/bootcamp/arduino.html>`_.
In that case the only tool you need is a modern web browser,
latest Firefox or Google Chrome should suffice.

If you've found a typos or have some other stuff to contribute, feel free to
fork this repository at BitBucket.

Preprocessing
=============

As said, the repository contains sources of the materials.
PDFs and HTML may be generated from the sources.
You can start off by checking out the Mercurial repository::

    hg clone http://bitbucket.org/lauri.vosandi/electronics-book

To preprocess those files you need some tools::

    sudo apt-get install rst2pdf inkscape fritzing imagemagick make

To build PDF-s just fire up make in the source tree::

    make

If everything goes smoothly, you should be able to browse PDF-s in the *build/* directory.
