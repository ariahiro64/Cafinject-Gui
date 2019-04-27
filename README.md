Cafinject-Gui

Cafineinject is a gui for gzinject. Gzinject is a program for loading LoZ Oot mods on a real Wii. 
Its meant to be portable with little to no changes code wise.

Building

  prerequisites: 
    java
    node.js
    electron (if the bat doesnt grab it for you or you arent on windows)

To build Cafinject on windows just click the batch file.
On another OS or 32 bit you need to build gzinject (https://github.com/krimtonz/gzinject) 
place it in the gzinject and correct the references.
Afterwords building is done just like any othe electron app.

Using Cafinject-Gui

Cafinject is meant for zelda roms but gzinject can work with others but i dont deter nore support this use.
*im not respnsible for mistakes so test on dolphin first.

Usually game id and home menu name can be left alone. dont edit game id unless you know what your doing.
 
Untouched wad is your base wad. 
 
Your rom must be a .z64 (it matters and just renaming it wont work so byte swap it).
The rom must be under 32mb.
 
The new wad is whatevery you want to name it. Unless you click inject zelda rom image its a dummy file.

Fixing button mappings make it easy to use the original controls as well as Raphnet adapters.
I have a raphnet and its the best way to play.
The controls are button accurate except L=Z Z=L. by default it maps c down to z and some weird stuff.
this option is recommended to be on.

Debug info only works if running it from the cmd.

Fixing the debug header is used to get zelootma to run. it basically tricks the wad into thinking its a 1.0
Im wondering if nintendo doesnt want people using that rom. anyway thats what its for.
With that said it doesnt help any idiot who destroyed their rom with Zelda edit.
As in any debug rom with "LEGEND OF DEBUG" in their header will NEVER be supported.

 
 




