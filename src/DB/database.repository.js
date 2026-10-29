// find || findOne || findById
export const find = async ({
    model,
    filter = {},
    select = "",
    options = {},
}) => {
    const doc = model.find(filter);
    if (select?.length) doc.select(select);
    if (options?.populate) doc.populate(options.populate);
    if (options?.lean) doc.lean(); // return the doc without any virtuals or ids
    if (options?.limit) doc.limit(options.limit);
    if (options?.skip) doc.skip(options.skip);
    if (options?.sort) doc.sort(options.sort);
    return doc.exec();
};

export const findOne = async ({
    model,
    filter = {},
    select = "",
    options = {},
}) => {
    const doc = model.findOne(filter);
    if (select?.length) doc.select(select);
    if (options?.populate) doc.populate(options.populate);
    if (options?.lean) doc.lean();
    return await doc.exec();
};

export const findById = async ({ model, id, select = "", options = {} }) => {
    const doc = model.findById(id).select(select);
    if (options?.populate) doc.populate(options.populate);
    if (options?.lean) doc.lean();
    return await doc.exec();
};

// Create
export const create = async ({
    model,
    data = [],
    options = { validateBeforeSave: true },
}) => {
    const [doc] = (await model.create(data, options)) || [];
    return doc;
};

// insertMany
export const insertMany = async ({ model, data }) => {
    return await model.insertMany(data, options);
};

// updateOne || updateMany || findOneAndUpdate || findByIdAndUpdate
export const updateOne = async ({
    model,
    filter = {},
    update,
    options = {},
}) => {
    return await model.updateOne(
        filter,
        { ...update, $inc: { __v: 1 } },
        options,
    );
};

export const findOneAndUpdate = async ({ model, filter, update, options }) => {
    return await model.findOneAndUpdate(
        filter,
        { ...update, $inc: { __v: 1 } },
        { ...options, returnDocument: "after", runValidator: true },
    );
};

export const findByIdAndUpdate = async ({
    model,
    id,
    update,
    options = {},
}) => {
    return await model.findByIdAndUpdate(
        id,
        { ...update, $inc: { __v: 1 } },
        { ...options, returnDocument: "after", runValidator: true },
    );
};

// deleteOne || deleteMany || findOneAndDelete || findByIdAndDelete
export const deleteOne = async ({ model, filter = {} }) => {
    return await model.deleteOne(filter);
};

export const deleteMany = async ({ model, filter = {} }) => {
    return await model.deleteMany(filter);
};

export const findOneAndDelete = async({
    model,
    filter ={}
}) =>{
    return await model.findOneAndDelete(filter)
}

export const findByIdAndDelete = async ({
    model,
    id
})=>{
    return await model.findByIdAndDelete(id);
}