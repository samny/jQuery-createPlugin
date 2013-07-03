/**
 * createPlugin
 *
 * A helper for creating a jQuery plugin with callable methods given a name and construcor function
 *
 * Example:
 *
 * $.createPlugin('pluginName', {
 *      // must have init function
 *      init:function(element, options){
 *          this.$el = $(element),
 *          this.$el.hide();
 *          return this;
 *      },
 *      doSomething: function(){
 *          return this.$el.show();
 *      }
 * });
 *
 * // run plugin on selected elements
 * $('.my').pluginName(options);
 *
 * // Call method
 * $('.my').pluginName('doSomething');
 *
 */

(function($) {
    'use strict';

    // Strings for type checking
    var s = 'string',
        f = 'function',
        o = 'object';

    $.extend({
        createPlugin: function(pluginName, Plugin) {

            // Check so that a plugin name is defined along with an object definition for it's prototype
            if (typeof pluginName === s && typeof Plugin.init === f) {

                // create jQuery plugin
                $.fn[pluginName] = function(options, args) {
                    if (this.length) {

                        // if the options argument is a string assume it's the name of a plugin method
                        if (typeof options === s) {

                            // Get the plugin instance of the first element if it exists
                            var instance = $.data(this[0], pluginName);

                            // check that an instance exists with a function
                            // that matches the string and then call it
                            if (instance && typeof instance[options] === f) {
                                return instance[options].apply(instance, args);
                            } else {
                                return this;
                            }

                        } else {
                            // Create plugin instances for each element in the jQuery collection
                            return this.each(function() {
                                // Get plugin instance if there is one
                                instance = $.data(this, pluginName);

                                // if there is no previous instance, create a fresh one and save it in the elements data.
                                if (!instance) {
                                    instance = Object.create(Plugin).init(this, options);
                                    instance.NAME = pluginName;
                                    $.data(this, pluginName, instance);
                                }

                                // if there is already a plugin instance,
                                // just apply any options on it if there is a setOptions method
                                else if (typeof options === o && typeof instance.setOptions === f) {
                                    instance.setOptions(options);
                                }
                            });
                        }
                    }
                    return this;
                };
            }
        }
    });
})(jQuery);
