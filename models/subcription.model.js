import mongoose from "mongoose";

const subcriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subcription name is required'],
        trim: true,
        minLength: 5,
        maxLength: 50,
    },
    price: {
        type: Number,
        required: [true, 'Subcription price is required'],
        min: [0, 'Price must be grater than 0']
    },
    currency: {
        type: String,
        enum: ['INR', 'USD', 'EUR', 'GBP'],
        default: 'INR',
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    category: {
        type: String,
        enum: ['sports', 'news', 'entertainment', 'technology', 'finance', 'other'],
        require: true
    },
    paymentMethod: {
        type: String,
        enum: ['upi', 'card', 'wallet', 'bank transfers', 'BNPL'],
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past'
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'Renewal date must be after the start date'
        }
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: true,
        index: true,
    }
}, { timestamps: true });

subcriptionSchema.pre('save', function(next){
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }
    next();
});

const Subcription = mongoose.model('Subcription', subcriptionSchema);

export default Subcription;