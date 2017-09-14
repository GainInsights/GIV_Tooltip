define(["client.property-panel/components/components", "client.property-panel/component-utils", "translator", "require"], function(a, b) {
	var c = window.location.href + "#gradient-cl-about";
    c = c.replace("state/analysis", "state/edit");
    var d = '<div id="img" style="width:100%; height:100%" ><img align="middle" src="/extensions/GIV_Tooltip/logo-black-text.png" alt="GainInsights Solutions" width="150" height="50" style="margin-left:auto;margin-right:auto;display:block;">',
	e = '<a href="http://gain-insights.com/" target="_blank" title="gain-insights.com" style="height:0px;">' + d + '</a> <div style="padding: 5px">Developed by: GainInsights Solutions Private Limited. For more information contact <a href="mailto:info@gain-insights.com" target="_blank">info@gain-insights.com</a></div></div><div style="text-align:right; padding-right:5px;"></div>',
        f = {
            template: e,
            controller: ["$scope", function(a) {
                var c = function() {
                    return a.data
                };
                b.defineLabel(a, a.definition, c, a.args.handler), b.defineVisible(a, a.args.handler), b.defineReadOnly(a, a.args.handler), b.defineChange(a, a.args.handler), b.defineValue(a, a.definition, c), a.getDescription = function(a) {
                    return "About" === a
                }
            }]
        };
    return a.addComponent("about-r", f), f
});