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
(function ($) {

    var s = 'string', f = 'function';

    $.extend({
        createPlugin: function (pluginName, Plugin) {
            if (typeof pluginName === s && typeof Plugin.init === f) {

                $.fn[pluginName] = function (options, args) {
                    if (this.length) {
                        var dataId = pluginName,
                            instance = $.data(this[0], dataId),
                            method;

                        if (instance && typeof options === s) {
                            method = instance[options];
                            if (typeof method === f) {
                                return method.apply(instance, args);
                            }
                        } else {
                            return this.each(function () {
                                instance = $.data(this, dataId);
                                if (!instance) {
                                    instance = Object.create(Plugin).init(this, options);
                                    instance.NAME = pluginName;
                                    $.data(this, dataId, instance);
                                } else if (typeof instance.setOptions === f) {
                                    instance.setOptions(options);
                                }
                            });
                        }
                    }
                    return this;
                };
            }
        }});
})(jQuery);
