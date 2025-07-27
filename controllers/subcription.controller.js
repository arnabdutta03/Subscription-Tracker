import Subcription from './../models/subcription.model.js';
import { workflowClient } from './../config/upstash.js';
import { SERVER_URL } from '../config/env.js'

export const createSubcription = async (req, res, next) => {
    try {
        const subcription = await Subcription.create({
            ...req.body,
            user: req.user._id,
        });

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subcription/reminder`,
            body: {
                subcriptionId: subcription.id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        })

        res.status(201).json({
            success: true,
            data: { subcription, workflowRunId },
        });

    } catch (error) {
        next(error);
    }
}

export const getAllSubcriptions = async (req, res, next) => {
    try {
        const subcriptions = await Subcription.find();

        res.status(200).json({
            success: true,
            data: subcriptions,
        });
    } catch (error) {
        next(error)
    }
}

export const getSubcription = async (req, res, next) => {
    try {
        const subcription = await Subcription.findById(req.params.id);
        if (!subcription) {
            const error = new Error('Subcription details not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: subcription,
        });
    } catch (error) {
        next(error)
    }
}

export const getUserSubcriptions = async (req, res, next) => {
    try {

        if (req.user.id != req.params.id) {
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }

        const subcriptions = await Subcription.find({ user: req.params.id });

        res.status(200).json({
            success: true,
            data: subcriptions,
        });
    } catch (error) {
        next(error)
    }
}