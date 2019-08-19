# Veriphone public JS library
This guide will show you how to use Veriphone's JS library to add phone number verification to your existing HTML phone field. 

Adding Veriphone verification to your <input> field takes 5 minutes. Just Follow these 5 steps:

1. Create a Veriphone account [here](https://veriphone.io) and copy your API key from your [control panel](https://veriphone.io/cp).
 

2. On your existing html page make sure you use JQuery library. If you dont, add the following script tag just before the closing ```</body>``` tag
```
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
```
 

3. Add veriphone JS library just before the closing ```</body>``` tag or right after the jquery ```script``` tag
```
<script src="https://cdn.jsdelivr.net/gh/veriphone/js@1.0/veriphone.min.js"></script>
```
 

4. Locate your phone number ```<input>``` field. Add to it the class veriphone and paste the API key you copied in step 1 into the attribute data-key.
```
<input class="veriphone" data-key="YOUR_KEY_HERE" />
```
 

5. At this point your phone verification should already be working. All we have to do now is add some styling to show the user when the phone number is valid or not. Add the following classes to your css and restyle to your convenience.
```
.veriphone{
  border: 3px solid #eee;
}
.veriphone.valid{
  border-color: #00CC00;
}
.veriphone.not-valid{
  border-color: #EE0000;
}
```
