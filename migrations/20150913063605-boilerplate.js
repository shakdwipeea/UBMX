var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var async = require('async');

exports.up = function(db, callback) { 
    console.log('Starting Migration.....');
    async.series([
        db.createTable.bind(db, 'user', {
        	id: { type: 'int', primaryKey: true },
        	name: 'string',
        	email: 'string',
        	phone: 'string'
        }),
        db.createTable.bind(db, 'vendor', {
        	id: { type: 'int', primaryKey: true },
        	name: 'string',
        	capacity_per_slot: 'int',
        	timings: 'string'
        }),
        db.createTable.bind(db, 'vehicle', {
        	id: { type: 'int', primaryKey: true },
        	name: 'string',
        	brand: 'string'
        }),
        db.createTable.bind(db, 'user_vehicle', {
        	id: { type: 'int', primaryKey: true },
        	user_id: {
        		type: 'int',
        		notNull: true,
        		foreignKey: {
        			name: 'user_vehicle_user_id_fk',
        			table: 'user',
        			rules: {
        				onDelete: 'CASCADE',
        				onUpdate: 'RESTRICT'
        			},
        			mapping: 'id'
        		}
        	},
        	vehicle_id: {
        		type: 'int',
        		notNull: true,
        		foreignKey: {
        			name: 'user_vehicle_vehicle_id_fk',
        			table: 'vehicle',
        			rules: {
        				onDelete: 'CASCADE',
        				onUpdate: 'RESTRICT'
        			},
        			mapping: 'id'
        		}
        	}
        }),
        db.createTable.bind(db, 'problem', {
        	id: { type: 'int', primaryKey: true },
        	name: 'string'
        }),
        db.createTable.bind(db, 'problem_vendor', {
        	id: { type: 'int', primaryKey: true },
        	vendor_id: {
        		type: 'int',
        		notNull: true,
        		foreignKey: {
        			name: 'problem_vendor_vendor_id_fk',
        			table: 'vendor',
        			rules: {
        				onDelete: 'CASCADE',
        				onUpdate: 'RESTRICT'
        			}, 
        			mapping: 'id'
        		}
        	},
        	problem_id: {
        		type: 'int',
        		notNull: true,
        		foreignKey: {
        			name: 'problem_vendor_problem_id_fk',
        			table: 'problem',
        			rules: {
        				onDelete: 'CASCADE',
        				onUpdate: 'RESTRICT'
        			},
        			mapping: 'id'
        		}
        	}
        }),
        db.createTable.bind(db, 'booking_type', {
        	id: { type: 'int', primaryKey: true },
        	name: 'string'
        }),
        db.createTable.bind(db, 'booking_type_vendor', {
        	id: { type: 'int', primaryKey: true },
        	type_id: {
        		type: 'int',
        		foreignKey: {
	        		name: 'booking_type_vendor_booking_type_id_fk',
	        		table: 'booking_type',
	        		rules: {
	        			onDelete: 'CASCADE',
	        			onUpdate: 'RESTRICT'
	        		},
	        		mapping: 'id'
        		}
        	},
        	vendor_id: {
        		type: 'int',
        		foreignKey: {
	        		name: 'booking_type_vendor_vendor_id_fk',
	        		table: 'vendor',
	        		rules: {
	        			onDelete: 'CASCADE',
	        			onUpdate: 'RESTRICT'
	        		},
	        		mapping: 'id'
        		}
        	}  
        }),
        db.createTable.bind(db, 'slot', {
        	id: { type: 'int', primaryKey: true },
        	timing: 'string',
        	booking_done: 'int',
        	booking_limit: 'int',
        	date: 'string',
        	vendor_id: {
        		type: 'int',
        		foreignKey: {
	        		name: 'slot_vendor_id_fk',
	        		table: 'vendor',
	        		rules: {
	        			onDelete: 'CASCADE',
	        			onUpdate: 'RESTRICT'
	        		},
	        		mapping: 'id'
        		}
        	}
        }),
        db.createTable.bind(db, 'booking', {
        	id: { type: 'int', primaryKey: true },
        	type_id: {
        		type: 'int',
        		foreignKey: {
	        		name: 'booking_type_id_fk',
	        		table: 'booking_type',
	        		rules: {
	        			onDelete: 'CASCADE',
	        			onUpdate: 'RESTRICT'
	        		},
	        		mapping: 'id'
        		}
        	},
        	vendor_id: {
        		type: 'int',
        		foreignKey: {
	        		name: 'booking_vendor_id_fk',
	        		table: 'vendor',
	        		rules: {
	        			onDelete: 'CASCADE',
	        			onUpdate: 'RESTRICT'
	        		},
	        		mapping: 'id'
        		}
        	},
        	user_id: {
        		type: 'int',
        		foreignKey: {
	        		name: 'booking_user_id_fk',
	        		table: 'user',
	        		rules: {
	        			onDelete: 'CASCADE',
	        			onUpdate: 'RESTRICT'
	        		},
	        		mapping: 'id'
        		}
        	},
			vehicle_id: {
				type: 'int',
				foreignKey: {
					name: 'booking_vehicle_id_fk',
					table: 'vehicle',
					rules: {
						onDelete: 'CASCADE',
						onUpdate: 'RESTRICT'
					},
					mapping: 'id'
				}
			},
        	status: 'string',
        	problem_id: {
        		type: 'int',
        		foreignKey: {
	        		name: 'booking_problem_id_fk',
	        		table: 'problem',
	        		rules: {
	        			onDelete: 'CASCADE',
	        			onUpdate: 'RESTRICT'
	        		},
	        		mapping: 'id'
        		}
        	},
        	slot_id: {
        		type: 'int',
        		foreignKey: {
	        		name: 'booking_slot_id_fk',
	        		table: 'slot',
	        		rules: {
	        			onDelete: 'CASCADE',
	        			onUpdate: 'RESTRICT'
	        		},
	        		mapping: 'id'
        		}
        	},
        	feedback: 'string',
			rating: 'string',
			pickup_add: 'string',
			drop_add: 'string'
        }),
		db.createTable.bind(db, 'address', {
			id: { type: 'int', primaryKey: true },
			user_id: {
        		type: 'int',
        		foreignKey: {
	        		name: 'address_user_id_fk',
	        		table: 'user',
	        		rules: {
	        			onDelete: 'CASCADE',
	        			onUpdate: 'RESTRICT'
	        		},
	        		mapping: 'id'
        		}
        	},
        	vendor_id: {
        		type: 'int',
        		foreignKey: {
	        		name: 'address_vendor_id_fk',
	        		table: 'vendor',
	        		rules: {
	        			onDelete: 'CASCADE',
	        			onUpdate: 'RESTRICT'
	        		},
	        		mapping: 'id'
        		}
        	},
        	lat: 'string',
        	lng: 'string',
        	place: 'string',
        	pincode: 'string'
		})
    ], callback);
};

exports.down = function(db, callback) {
  var tabe = [
        db.dropTable.bind(db, 'user'),
        db.dropTable.bind(db, 'vendor'),
        db.dropTable.bind(db, 'vehicle'),
        db.dropTable.bind(db, 'user_vehicle'),
        db.dropTable.bind(db, 'problem'),
        db.dropTable.bind(db, 'problem_vendor'),
        db.dropTable.bind(db, 'booking_type'),
        db.dropTable.bind(db, 'booking_type_vendor'),
        db.dropTable.bind(db, 'slot'),
        db.dropTable.bind(db, 'booking'),
        db.dropTable.bind(db, 'address')
    ].reverse();  


  async.series(tabe, callback);
};
