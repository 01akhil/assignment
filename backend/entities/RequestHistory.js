// import { Entity, PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/core';
// import { ObjectId } from '@mikro-orm/mongodb';

// @Entity()
// export class RequestHistory {
//   @PrimaryKey()
//   _id = new ObjectId();

//   @SerializedPrimaryKey()
//   id;

//   @Property()
//   method;

//   @Property()
//   url;

//   @Property({ type: 'json' })
//   headers = {};

//   @Property({ type: 'text' })
//   body = '';

//   @Property({ type: 'json' })
//   params = {};

//   @Property({ type: 'json' })
//   response = {};

//   @Property()
//   status;

//   @Property()
//   responseTime;

//   @Property()
//   createdAt = new Date();
// }



import { EntitySchema } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

export const RequestHistory = new EntitySchema({
  name: 'RequestHistory',
  collection: 'request_history',
  properties: {
    _id: { type: ObjectId, primary: true },
    id: { serializedPrimaryKey: true, type: String },
    method: { type: String },
    url: { type: String },
    headers: { type: 'json', default: {} },
    body: { type: 'text', default: '' },
    params: { type: 'json', default: {} },
    response: { type: 'json', default: {} },
    status: { type: Number },
    responseTime: { type: Number },
    createdAt: { type: Date, defaultRaw: 'new Date()' }
  }
});
