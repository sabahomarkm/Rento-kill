define("Form3", function() {
    return function(controller) {
        function addWidgetsForm3() {
            this.setDefaultUnit(voltmx.flex.DP);
            var Browser0dbd691f2d96440 = new voltmx.ui.Browser({
                "detectTelNumber": true,
                "enableZoom": false,
                "height": "800dp",
                "htmlString": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\"/>\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"/>\n<style>\n*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\nbody, html { width: 100%; height: 100%; font-family: 'Segoe UI', sans-serif; background: #f5f5f3; }\n.page-wrap { display: flex; flex-direction: column; min-height: 100vh; }\n.site-header { background: rgb(226,0,26); padding: 0 2.5rem; height: 64px; display: flex; align-items: center; justify-content: space-between; }\n.logo-text { font-size: 20px; font-weight: 700; color: #fff; cursor: pointer; }\n.site-nav { display: flex; align-items: center; gap: 4px; }\n.nav-link { padding: 7px 16px; color: rgba(255,255,255,0.85); font-size: 14px; font-weight: 500; border-radius: 4px; cursor: pointer; border: none; background: none; font-family: 'Segoe UI', sans-serif; }\n.nav-link:hover { background: rgba(255,255,255,0.15); color: #fff; }\n.nav-link.active { background: rgba(255,255,255,0.2); color: #fff; }\n.btn-logout { margin-left: 8px; padding: 7px 16px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; color: #fff; font-size: 13px; font-weight: 600; cursor: pointer; font-family: 'Segoe UI', sans-serif; }\n.btn-logout:hover { background: rgba(255,255,255,0.25); }\n.banner { background: #2a2a26; padding: 3rem 2.5rem; text-align: center; }\n.banner h1 { font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; }\n.banner h1 span { color: rgb(226,0,26); }\n.banner p { font-size: 15px; color: #aaa; max-width: 600px; margin: 0 auto; line-height: 1.6; }\n.main-content { flex: 1; padding: 3rem 2.5rem; }\n.content-container { max-width: 900px; margin: 0 auto; }\n.section { margin-bottom: 3rem; }\n.section-title { font-size: 1.5rem; font-weight: 700; color: #333; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 3px solid rgb(226,0,26); display: inline-block; }\n.section-text { color: #666; line-height: 1.8; font-size: 14px; margin-bottom: 1rem; }\n.mission-statement { background: #f9f9f7; padding: 2rem; border-left: 4px solid rgb(226,0,26); border-radius: 6px; margin: 2rem 0; }\n.mission-statement p { font-size: 16px; color: #333; font-weight: 500; line-height: 1.8; margin: 0; }\n.values-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin: 2rem 0; }\n.value-card { background: #fff; padding: 1.5rem; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }\n.value-card h3 { color: rgb(226,0,26); font-size: 15px; font-weight: 700; margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; }\n.value-card p { color: #666; font-size: 13px; line-height: 1.6; }\n.stats-section { background: rgb(226,0,26); color: #fff; padding: 2.5rem; border-radius: 8px; margin: 2rem 0; }\n.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 2rem; text-align: center; }\n.stat-item h3 { font-size: 2.2rem; font-weight: 700; margin-bottom: 0.5rem; }\n.stat-item p { font-size: 13px; color: rgba(255,255,255,0.9); }\n.services-list { list-style: none; }\n.services-list li { padding: 0.75rem 0; color: #666; font-size: 14px; line-height: 1.6; border-bottom: 1px solid #e0e0e0; display: flex; align-items: flex-start; gap: 0.75rem; }\n.services-list li:before { content: \"✓\"; color: rgb(226,0,26); font-weight: 700; font-size: 16px; flex-shrink: 0; }\n.services-list li:last-child { border-bottom: none; }\n.cta-section { background: #2a2a26; color: #fff; padding: 2rem; border-radius: 8px; text-align: center; margin: 2rem 0; }\n.cta-section h3 { font-size: 1.3rem; margin-bottom: 1rem; }\n.cta-section p { font-size: 14px; color: #aaa; margin-bottom: 1.5rem; }\n.btn-cta { display: inline-block; padding: 12px 32px; background: rgb(226,0,26); color: #fff; text-decoration: none; border-radius: 6px; font-weight: 700; font-size: 14px; border: none; cursor: pointer; text-transform: uppercase; letter-spacing: 0.3px; font-family: 'Segoe UI', sans-serif; }\n.btn-cta:hover { background: rgb(180,0,20); }\n.site-footer { background: rgb(226,0,26); padding: 14px 2.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; }\n.site-footer .copy { font-size: 12px; color: rgba(255,255,255,0.7); }\n.site-footer .copy span { color: #fff; font-weight: 600; }\n.site-footer .links { display: flex; gap: 1.5rem; }\n.site-footer .links a { font-size: 12px; color: rgba(255,255,255,0.7); text-decoration: none; cursor: pointer; }\n.site-footer .links a:hover { color: #fff; }\n</style>\n</head>\n<body>\n<div class=\"page-wrap\">\n\n  <div class=\"banner\">\n    <h1>About <span>Rentokil</span></h1>\n    <p>Leading the pest management industry with trusted solutions since 1925. Protecting homes and businesses worldwide.</p>\n  </div>\n\n  <div class=\"main-content\">\n    <div class=\"content-container\">\n\n      <!-- Who We Are Section -->\n      <div class=\"section\">\n        <h2 class=\"section-title\">Who We Are</h2>\n        <p class=\"section-text\">\n          Rentokil is a global leader in pest management and specialist hygiene services. For nearly a century, we have been the trusted choice for homeowners, businesses, and industrial facilities seeking professional pest control solutions. With operations in over 80 countries and a team of certified professionals, we deliver proven results and peace of mind.\n        </p>\n        <p class=\"section-text\">\n          Our commitment to innovation, quality, and customer satisfaction has made us the industry's most trusted name in pest management. We combine cutting-edge technology with expert knowledge to provide comprehensive solutions tailored to your unique needs.\n        </p>\n      </div>\n\n      <!-- Mission Statement -->\n      <div class=\"mission-statement\">\n        <p>\"To protect people and their property by delivering world-class pest control and specialist hygiene services, setting the standard for excellence in the industry.\"</p>\n      </div>\n\n      <!-- Our Values -->\n      <div class=\"section\">\n        <h2 class=\"section-title\">Our Core Values</h2>\n        <div class=\"values-grid\">\n          <div class=\"value-card\">\n            <h3>Excellence</h3>\n            <p>We deliver superior service quality in everything we do, with attention to detail and professional expertise.</p>\n          </div>\n          <div class=\"value-card\">\n            <h3>Trust</h3>\n            <p>Built on decades of reliable service, our customers trust us to protect what matters most to them.</p>\n          </div>\n          <div class=\"value-card\">\n            <h3>Innovation</h3>\n            <p>We invest in latest technology and methods to provide effective, environmentally responsible solutions.</p>\n          </div>\n          <div class=\"value-card\">\n            <h3>Customer Focus</h3>\n            <p>Your satisfaction is our priority. We listen, respond, and adapt our services to meet your specific needs.</p>\n          </div>\n        </div>\n      </div>\n\n      <!-- By The Numbers -->\n      <div class=\"stats-section\">\n        <h2 style=\"text-align: center; margin-bottom: 2rem; font-size: 1.5rem;\">By The Numbers</h2>\n        <div class=\"stats-grid\">\n          <div class=\"stat-item\">\n            <h3>100+</h3>\n            <p>Years of Experience</p>\n          </div>\n          <div class=\"stat-item\">\n            <h3>80+</h3>\n            <p>Countries Served</p>\n          </div>\n          <div class=\"stat-item\">\n            <h3>1M+</h3>\n            <p>Customers Protected</p>\n          </div>\n          <div class=\"stat-item\">\n            <h3>24/7</h3>\n            <p>Customer Support</p>\n          </div>\n        </div>\n      </div>\n\n      <!-- Our Services -->\n      <div class=\"section\">\n        <h2 class=\"section-title\">Our Services</h2>\n        <p class=\"section-text\">\n          We offer comprehensive pest management solutions for residential, commercial, and industrial clients:\n        </p>\n        <ul class=\"services-list\">\n          <li>Rodent Control - Effective elimination and prevention of rat and mouse infestations</li>\n          <li>Insect Control - Professional treatment for ants, cockroaches, bed bugs, and other insects</li>\n          <li>Bird Management - Humane and effective solutions for bird-related issues</li>\n          <li>Termite Control - Advanced protection against termite damage and infestation</li>\n          <li>Disinfection Services - Specialized hygiene and disinfection solutions</li>\n          <li>Preventive Programs - Customized maintenance plans to prevent future infestations</li>\n          <li>24/7 Emergency Response - Rapid response to urgent pest management needs</li>\n        </ul>\n      </div>\n\n      <!-- Why Choose Us -->\n      <div class=\"section\">\n        <h2 class=\"section-title\">Why Choose Rentokil</h2>\n        <p class=\"section-text\">\n          <strong>Certified Professionals:</strong> Our team consists of trained, certified pest control specialists with extensive industry experience.\n        </p>\n        <p class=\"section-text\">\n          <strong>Advanced Technology:</strong> We use state-of-the-art equipment and environmentally responsible treatment methods.\n        </p>\n        <p class=\"section-text\">\n          <strong>Guaranteed Results:</strong> We stand behind our work with satisfaction guarantees and follow-up inspections.\n        </p>\n        <p class=\"section-text\">\n          <strong>Tailored Solutions:</strong> Every property is unique. We customize our approach to your specific pest management needs.\n        </p>\n        <p class=\"section-text\">\n          <strong>Environmentally Conscious:</strong> We prioritize safe, eco-friendly solutions that protect your family and the environment.\n        </p>\n      </div>\n\n      <!-- CTA Section -->\n      <div class=\"cta-section\">\n        <h3>Ready to Get Started?</h3>\n        <p>Book a pest control service today and get professional protection for your home or business.</p>\n        <button class=\"btn-cta\" onclick=\"handleBooking()\">Book Your Service Now</button>\n      </div>\n\n    </div>\n  </div>\n\n</div>\n\n<script>\nfunction handleBooking() {\n  if (window.voltmx) {\n    voltmx.evaluateJavaScriptInNativeContext(\"navigateToForm2()\");\n  } else {\n    alert('Navigate to Booking Form');\n  }\n}\n</script>\n</body>\n</html>",
                "id": "Browser0dbd691f2d96440",
                "isVisible": true,
                "left": "-20dp",
                "setAsContent": true,
                "top": "100dp",
                "width": "101.76%",
                "zIndex": 1
            }, {}, {});
            var Flexheader = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "clipBounds": false,
                "height": "120dp",
                "id": "Flexheader",
                "isVisible": true,
                "layoutType": voltmx.flex.FREE_FORM,
                "left": "0dp",
                "isModalContainer": false,
                "skin": "CopyslFbox0b95575816def48",
                "top": "0dp",
                "width": "100.00%",
                "zIndex": 1,
                "appName": "rentokilUi"
            }, {
                "paddingInPixel": false
            }, {});
            Flexheader.setDefaultUnit(voltmx.flex.DP);
            var Logo = new voltmx.ui.Label({
                "id": "Logo",
                "isVisible": true,
                "left": "67dp",
                "skin": "CopydefLabel0cb9afd4fdfd945",
                "text": "Rentokil",
                "top": "42dp",
                "width": voltmx.flex.USE_PREFERRED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            var Button0b0b270a70ae742 = new voltmx.ui.Button({
                "height": "50dp",
                "id": "Button0b0b270a70ae742",
                "isVisible": true,
                "onClick": controller.AS_Button_f4a3f1b929a94eeb86b316e033bb3d0b,
                "right": "10px",
                "skin": "CopydefBtnNormal0f39bde99a20241",
                "text": "Logout",
                "top": "34dp",
                "width": "300dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "displayText": true,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            Flexheader.add(Logo, Button0b0b270a70ae742);
            this.compInstData = {}
            this.add(Browser0dbd691f2d96440, Flexheader);
        };
        return [{
            "addWidgets": addWidgetsForm3,
            "enabledForIdleTimeout": false,
            "id": "Form3",
            "layoutType": voltmx.flex.FREE_FORM,
            "needAppMenu": false,
            "skin": "slForm",
            "onBreakpointHandler": onBreakpointHandler,
            "breakpoints": [640, 1024, 1366],
            "appName": "rentokilUi",
            "info": {
                "kuid": "h8eb1bf35ced4ce785308a24ee8a9b6d"
            }
        }, {
            "displayOrientation": constants.FORM_DISPLAY_ORIENTATION_PORTRAIT,
            "layoutType": voltmx.flex.FREE_FORM,
            "paddingInPixel": false
        }, {
            "retainScrollPosition": false
        }]
    }
});