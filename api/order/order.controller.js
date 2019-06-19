const models = require('../../database/models');
const Sequelize = require('sequelize');
const FCM = require('fcm-node');
const config = require('../../util/config')
const fcm = new FCM(config.fcmKey);

exports.index = (req, res) => {
    const tableId = req.query.table_id
    models.Order.findOne({
        where: {
            fk_store_id: 1,
            fk_table_id: tableId,
            status: false
        },
        order: [
            ['created_at', 'DESC']
        ]
    })
    .then((row) => {
        if(row != null) {
            return models.OrderDetail.findAll({
                where: {
                    fk_order_id: row.id
                },
                include: [
                    { model: models.Menu, as: 'menu' }
                ]
            })
        }
    })
    .then((rows) => {
        res.send(rows)
    })
    .catch(err => {
        console.log(err);
    })
}

exports.create = (req, res) => {
    const tableId = req.body.table_id;
    const orderData = req.body.order_data;
    const fbToken = req.body.fb_token;

    models.Order.create({
        fk_store_id: 1,
        fk_table_id: tableId,
        fb_token: fbToken
    })
    .then(row => {
        return models.OrderDetail.postMultiOrderDetail(row.id, JSON.parse(orderData));
    })
    .then(result => {
        let idArr = [];
        for (let i = 0; i < result[1]; i++) {
            idArr.push(result[0] + i);
        }
        return models.OrderDetail.findAll({
            where: Sequelize.or({
                id: idArr
            })
        })
    })
    .then((rows) => {
        res.send(rows);
    })
    .catch(err => {
        res.send(err);
    })
}

exports.update = (req, res) => {
    const orderId = req.params.id;

    models.Order.update({
        status: true
    }, {
        where: {
            id: orderId
        }
    })
    .then(() => {
        return models.Order.findOne({
            where: {
                id: orderId
            }
        })
    })
    .then((row) => {
        const userToken = row.fb_token;
        const pustData = {
            to: userToken,
            data: {
                title: "요리 완료",
                message: `${row.fk_table_id}번 테이블 요리가 완료되었습니다.`
            }
        }
        fcm.send(pustData, (err, response) => {
            if (err) {
                console.log('메시지전송 실패');
                return;
            } else {
                console.log('메시지전송 성공');
                console.log(response);
            }
        })
        res.send(row);
    })
}
