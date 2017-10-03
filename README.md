# pinodevscode
Debugging Node.js on the Raspberry Pi with Visual Studio Code

Steps:

1. Flash Raspbian to SD Card
1. Configure Pi
  - Enable ssh
  - Setup ssh keys
  - Install and configure Samba
  - Map network drive
  - Create project folder on Pi
    - mkdir foldername
    - touch app.js
    - npm init (accept defaults)
  - Configure git
    - `git config core.fileMode false` on both pi and windows side
    - `git config core.autocrlf false` on windows ?
 
