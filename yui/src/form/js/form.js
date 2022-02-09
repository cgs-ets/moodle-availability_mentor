M.availability_mentor = M.availability_mentor || {};

M.availability_mentor.form = Y.Object(M.core_availability.plugin);

/**
 * Groups available for selection (alphabetical order).
 *
 * @property groups
 * @type Array
 */
M.availability_mentor.form.groups = null;

/**
 * Initialises this plugin.
 *
 * @method initInner
 * @param {Array} groups Array of objects containing groupid => name
 */
M.availability_mentor.form.initInner = function (groups) {
    // The 'groups' variable is the parameter passed through from PHP (you
    // can have more than one if required).
    this.groups = groups;
};

M.availability_mentor.form.getNode = function (json) {
    // Create HTML structure.

    var html = '<label><span class="p-r-1">' + M.util.get_string('title', 'availability_mentor') +
        '<span class="availability-group">' +
        '<select name="id" class="custom-select">' +
        '<option value="choose">' + M.util.get_string('choosedots', 'moodle') + '</option>' +
        '<option value="any">' + M.util.get_string('anygroup', 'availability_mentor') + '</option>';
    for (var i = 0; i < this.groups.length; i++) {
        var group = this.groups[i];
        // String has already been escaped using format_string.
        html += '<option value="' + group.id + '">' + group.name + '</option>';
    }
    html += '</select></span></label>';
    var node = Y.Node.create('<span class="form-inline">' + html + '</span>');

    // Set initial values (leave default 'choose' if creating afresh).
    if (json.creating === undefined) {
        if (json.id !== undefined &&
            node.one('select[name=id] > option[value=' + json.id + ']')) {
            node.one('select[name=id]').set('value', '' + json.id);
        } else if (json.id === undefined) {
            node.one('select[name=id]').set('value', 'any');
        }
    }

    // Add event handlers (first time only).
    if (!M.availability_mentor.form.addedEvents) {
        M.availability_mentor.form.addedEvents = true;
        var root = Y.one('.availability-field');
        root.delegate('change', function () {
            // Just update the form fields.
            M.core_availability.form.update();
        }, '.availability_mentor select');
    }

    return node;
};
M.availability_mentor.form.fillValue = function (value, node) {
    var selected = node.one('select[name=id]').get('value');
    if (selected === 'choose') {
        value.id = 'choose';
    } else if (selected !== 'any') {
        value.id = parseInt(selected, 10);
    }
};

M.availability_mentor.form.fillErrors = function (errors, node) {
    var value = {};
    this.fillValue(value, node);

    // Check group item id.
    if (value.id && value.id === 'choose') {
        errors.push('availability_mentor:error_selectgroup');
    }
};