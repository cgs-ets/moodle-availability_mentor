YUI.add("moodle-availability_mentor-form",function(e,t){M.availability_mentor=M.availability_mentor||{},M.availability_mentor.form=e.Object(M.core_availability.plugin),M.availability_mentor.form.groups=null,M.availability_mentor.form.initInner=function(e){this.groups=e},M.availability_mentor.form.getNode=function(t){var n='<label><span class="p-r-1">'+M.util.get_string("title","availability_mentor")+'<span class="availability-group">'+'<select name="id" class="custom-select">'+'<option value="choose">'+M.util.get_string("choosedots","moodle")+"</option>"+'<option value="any">'+M.util.get_string("anygroup","availability_mentor")+"</option>";for(var r=0;r<this.groups.length;r++){var i=this.groups[r];n+='<option value="'+i.id+'">'+i.name+"</option>"}n+="</select></span></label>";var s=e.Node.create('<span class="form-inline">'+n+"</span>");t.creating===undefined&&(t.id!==undefined&&s.one("select[name=id] > option[value="+t.id+"]")?s.one("select[name=id]").set("value",""+t.id):t.id===undefined&&s.one("select[name=id]").set("value","any"));if(!M.availability_mentor.form.addedEvents){M.availability_mentor.form.addedEvents=!0;var o=e.one(".availability-field");o.delegate("change",function(){M.core_availability.form.update()},".availability_mentor select")}return s},M.availability_mentor.form.fillValue=function(e,t){var n=t.one("select[name=id]").get("value");n==="choose"?e.id="choose":n!=="any"&&(e.id=parseInt(n,10))},M.availability_mentor.form.fillErrors=function(e,t){var n={};this.fillValue(n,t),n.id&&n.id==="choose"&&e.push("availability_mentor:error_selectgroup")}},"@VERSION@",{requires:["base","node","event","moodle-core_availability-form"]});
