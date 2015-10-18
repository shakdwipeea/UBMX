var vendors = require('../controller/vendors'),
    slots = require('../controller/slots');

exports.random = function () {
    return Math.floor((1 + Math.random()) * 500020);
};

exports.myRandomNumber = function () {
    return Math.floor((1 + Math.random()) * 500020);
};

exports.getAvailableSlots = function (vendor_id, slot_day, callback) {
    async.parallel([
      (cb) => {
        vendors.getVendorById(vendor_id, (err, vendor) => {
          cb(err, vendor);
        });
      },
      (cb) => {
          slots.getVendorSlots(vendor_id, slot_day, (err, slots) => {
          cb(err, slots);
        });
      }
    ], (err, results) => {
      if (err) {
        return callback(err, null);
      } else {
        var vendor = results[0],
            slots = results[1];

        var timings = vendor.timings;

        var possible_timings = timings
            .split('-')
            .map((timing) => timing / 100);

        var times = [];
        for (var i = possible_timings[0]; i <= possible_timings[1]; i++) {
          times.push(i);
        }

        var slots_full = slots
            .filter((slot) => slot.booking_done == slot.booking_limit)
            .map((slot) => slot.timing.split('-')[0] / 100);

        var slots_empty = slots
            .filter((slot) => slot.booking_done < slot.booking_limit)
            .map((slot) => slot.timing.split('-')[0] / 100);

        times = times.filter((time) => slots_full.indexOf(time) == -1);

        callback(null, {
          times: times,
          slotsAvailable: slots_empty,
          vendor: vendor,
          slots: slots
        });

      }
    });
};

