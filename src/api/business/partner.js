/* eslint-disable camelcase */
import BaseApi from '../base';

class PartnerApi extends BaseApi {
  // 合作商家列表
  getList({
    current, pageSize, status, partner_name,
  }) {
    return this.post('/platform/v1/system/partner/list', {
      page: current,
      pageSize,
      status,
      partner_name,
    });
  }

  // 新增
  create({
    partner_name, partner_image, partner_address, partner_contact_name,
    partner_contact, status,
  }) {
    return this.post('/platform/v1/system/partner/create', {
      partner_name,
      partner_image,
      partner_address,
      partner_contact_name,
      partner_contact,
      status,
    });
  }

  update({
    partner_id, partner_name, partner_image, partner_address, partner_contact_name,
    partner_contact, status,
  }) {
    return this.post('/platform/v1/system/partner/update', {
      partner_id,
      partner_name,
      partner_image,
      partner_address,
      partner_contact_name,
      partner_contact,
      status,
    });
  }

  edit({
    partner_id,
  }) {
    return this.post('/platform/v1/system/partner/edit', {
      partner_id,
    });
  }

  remove({
    partner_id,
  }) {
    return this.post('/platform/v1/system/partner/remove', {
      partner_id,
    });
  }
}

export default new PartnerApi();
