package org.andy.work.dao.impl;

import org.andy.work.dao.ApprovalDao;
import org.andy.work.dao.ManagerDao;
import org.andy.work.entity.Approval;
import org.andy.work.entity.Manager;
import org.andy.work.entity.Organ;
import org.andy.work.entity.Role;
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
@Repository("managerDao")
public class ManagerDaoImpl implements ManagerDao {

	@Autowired
	private SessionFactory sessionFactory;

	private Session getCurrentSession() {
		return this.sessionFactory.getCurrentSession();
	}

	@Override
	public Manager load(int id) {
		return (Manager) this.getCurrentSession().load(Manager.class, id);
	}
	
	@Override
	public Manager get(int id) {
		return (Manager) this.getCurrentSession().get(Manager.class, id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Manager> findAll() {
		List<Manager> Approvals = this.getCurrentSession().createQuery("from Manager").setCacheable(true).list();
		return Approvals;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Manager> List(int page,int limit,Role role) {
		Criteria crit = this.getCurrentSession().createCriteria(Manager.class);
		if(role!=null)
		{
			crit.add(Restrictions.eq("role", role));
		}
		List<Manager> list = crit.setFirstResult(page-1).setMaxResults(limit).list();
		return list;
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<Manager> GetByName(String Name) {
		Criteria crit = this.getCurrentSession().createCriteria(Manager.class);
		crit.addOrder(Order.desc("id"));
		crit.add(Restrictions.eq("name", Name));
		List<Manager> list = crit.list();
		//List<Image> Approvals = this.getCurrentSession().createQuery("from Image order by ID desc").setEntity("Type",type).list();
		return list;
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<Manager> ListAll(Role role) {
		Criteria crit = this.getCurrentSession().createCriteria(Manager.class);
		if(role!=null)
		{
			crit.add(Restrictions.eq("role", role));
		}
		List<Manager> list = crit.list();
		return list;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Manager getByAccount(String Accout) {
		Criteria crit = this.getCurrentSession().createCriteria(Manager.class);
		crit.add(Restrictions.eq("account", Accout));
		Manager list = (Manager)crit.uniqueResult();

		return list;
	}
	
	@Override
	public void persist(Manager entity) {
		this.getCurrentSession().persist(entity);

	}

	@Override
	public Integer save(Manager entity) {
		return (Integer) this.getCurrentSession().save(entity);
	}

	@Override
	public void saveOrUpdate(Manager entity) {
		this.getCurrentSession().saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		Manager entity = this.load(id);
		this.getCurrentSession().delete(entity);
	}

	@Override
	public void flush() {
		this.getCurrentSession().flush();

	}

}
