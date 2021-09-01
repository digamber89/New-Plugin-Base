# Plugin Base

## PSR-4 Autoload
- Run composer dump-autload
- Change Namespace in composer.json and
```json
 "psr-4": {"Digthis\\PluginBase\\": "includes/"}
```
to e.g.
```json
 "psr-4": {"Codemanas\\PluginBase\\": "includes/"}
```
Then in your terminal run 
```text
composer dump-autoload -o
```

## Admin Settings
For Admin Setting run  ```npm run start``` to start development.
After all development is done run ```npm run build```