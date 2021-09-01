# Plugin Base

## PSR-4 Autoload
- Run composer dump-autload
- Change Namespace in composer.json and see [documentation](https://www.php-fig.org/psr/psr-4/) for PSR-4 Autoload Implementation 
```json
 "psr-4": {"Digthis\\PluginBase\\": "includes/"}
```
to e.g.
```json
 "psr-4": {"<NamespaceName>\\PluginBase\\": "includes/"}
```
Then in your terminal run 
```text
composer dump-autoload -o
```

## Admin Settings
For Admin Setting run  ```npm run start``` to start development.
After all development is done run ```npm run build```