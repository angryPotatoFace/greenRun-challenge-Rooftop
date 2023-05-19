"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bet = void 0;
const typeorm_1 = require("typeorm");
let Bet = class Bet extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Object)
], Bet.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Bet.prototype, "bet_option", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], Bet.prototype, "sport", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['active', 'cancelled', 'settled'] }),
    __metadata("design:type", Object)
], Bet.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], Bet.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Bet.prototype, "event_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double', nullable: true }),
    __metadata("design:type", Object)
], Bet.prototype, "odd", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['won', 'lost'] }),
    __metadata("design:type", Object)
], Bet.prototype, "result", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: Date }),
    __metadata("design:type", Object)
], Bet.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: Date }),
    __metadata("design:type", Object)
], Bet.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: Date }),
    __metadata("design:type", Object)
], Bet.prototype, "deleted_at", void 0);
Bet = __decorate([
    (0, typeorm_1.Entity)()
], Bet);
exports.Bet = Bet;