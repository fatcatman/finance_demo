package org.andy.work.dao.impl;

import org.andy.work.dao.ImageDao;
import org.andy.work.dao.OrganapprovalDao;
import org.andy.work.entity.Approval;
import org.andy.work.entity.Image;
import org.andy.work.entity.Organ;
import org.andy.work.entity.Organapproval;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 创建时间：2015-2-6 下午2:45:14
 * 
 * @author andy
 * @version 2.2
 */
@Repository("organapprovalDao")
public class OrganapprovalDaoImpl implements OrganapprovalDao {

	@Autowired
	private SessionFactory sessionFactory;

	private Session getCurrentSession() {
		return this.sessionFactory.getCurrentSession();
	}

	@Override
	public Organapproval load(int id) {
		return (Organapproval) this.getCurrentSession().load(Organapproval.class, id);
	}
	
	@Override
	public Organapproval get(int id) {
		return (Organapproval) this.getCurrentSession().get(Organapproval.class, id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Organapproval> findAll() {
		List<Organapproval> Approvals = this.getCurrentSession().createQuery("from Image").setCacheable(true).list();
		return Approvals;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Organapproval> List(Approval type) {
		Criteria crit = this.getCurrentSession().createCriteria(Organapproval.class);
		crit.addOrder(Order.desc("id"));
		crit.add(Restrictions.eq("approval", type));
		List<Organapproval> list = crit.list();
		//List<Image> Approvals = this.getCurrentSession().createQuery("from Image order by ID desc").setEntity("Type",type).list();
		return list;
	}
	@SuppressWarnings("unchecked")
	@Override
	public Organapproval GetByOrg(Approval type, Organ org) {
		Criteria crit = this.getCurrentSession().createCriteria(Organapproval.class);
		crit.addOrder(Order.desc("id"));
		crit.add(Restrictions.eq("approval", type));
		crit.add(Restrictions.eq("organ", org));
		List<Organapproval> list = crit.list();
		if(list.size()<=0){
			return null;
		}
		//List<Image> Approvals = this.getCurrentSession().createQuery("from Image order by ID desc").setEntity("Type",type).list();
		return list.get(0);
	}
	@Override
	public void persist(Organapproval entity) {
		this.getCurrentSession().persist(entity);

	}

	@Override
	public Integer save(Organapproval entity) {
		return (Integer) this.getCurrentSession().save(entity);
	}

	@Override
	public void saveOrUpdate(Organapproval entity) {
		this.getCurrentSession().saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		Organapproval entity = this.load(id);
		this.getCurrentSession().delete(entity);
	}

	@Override
	public void flush() {
		this.getCurrentSession().flush();
	}

}
