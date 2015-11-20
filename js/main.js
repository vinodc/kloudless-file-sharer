;(function() {
  
  var kloudlessAppID = "iCZ_ICMy43H0NSoz0QbLvmyjzCHf2frAOPaBfWVgh9_vrFIM";

  /*
   * element: jQuery DOM element to bind the dropzone to. Requires an ID.
   */
  var fs = window.FileSharer = function(element, successHandler) {
    this.element = element;
    this.successHandler = successHandler;
    this.init();
  };
  
  fs.prototype.init = function() {
    this.dropzone = window.Kloudless.dropzone({
      app_id: kloudlessAppID,
      elementId: this.element.attr('id'), // Element to bind the dropzone to
      multiselect: true, // To upload more than 1 file.

      // The options below apply to the File Explorer that appears when the
      // dropzone is clicked.
      computer: true,
      link: true,
      link_options: this.linkOptions, 
      services: ['all'],
      types: ['all'],
    });
    
    if (this.successHandler)
      this.dropzone.on('success', this.successHandler);
  };

  fs.prototype.setLinkOptions = function(opts) {
    this.dropzone.update({
      link_options: opts
    });
  };

})();

$.widget("custom.filesharer", {

  // jQuery widget attributes/methods.

  options: {
    password: null,
    expiration: null,
  },

  _create: function() {
    var self = this;
    self.fs = new window.FileSharer(self.element, function(files) {
      self._trigger("complete", null, {files: files});
    });
    self.reload();
  },

  _setOptions: function( options ) {
    this._super(options);
    this.reload();
  },

  // Custom attributes/methods.

  _getLinkOptions: function() {
    return {
      direct: false,
      password: this.options.password,
      expiration: this.options.expiration,
    }
  },

  reload: function() {
    this.fs.setLinkOptions(this._getLinkOptions());
  },
});

$(document).ready(function() {
  var $fs = $("#dropzone").filesharer({
    complete: function(event, data) {
      if (!data.files || data.files.length === 0)
        return;
      
      $("#results").empty();

      var rowTmpl = $.templates("#resultRowTempl");
      $.each(data.files, function(i, file) {
        var rowHtml = rowTmpl.render({
          name: file.name,
          url: file.link,
          expiration: $fs.option("expiration"),
          password: $fs.option("password"),
        });
        $("#results").append(rowHtml);
      });

      $("#results-wrapper").show();
    }
  }).data("custom-filesharer");

  $("#expiration").datetimepicker({
    format: "Y-m-d H:i:00O",
    step: 15,
    allowBlank: true,
    onChangeDateTime: function(dp, $input) {
      $fs.option('expiration', $input.val())
    },
  });

  $("#password").change(function() {
    $fs.option('password', $(this).val());
  });

  $("#start").click(function() {
    $("#cover-wrapper").hide();
    $("#explorer-wrapper").show();
  });
});