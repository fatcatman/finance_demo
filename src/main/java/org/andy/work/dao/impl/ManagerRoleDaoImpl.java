package org.andy.work.dao.impl;

import org.andy.work.dao.ManagerDao;
import org.andy.work.dao.ManagerRoleDao;
import org.andy.work.entity.Manager;
import org.andy.work.entity.Role;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
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
@Repository("managerRoleDao")
public class ManagerRoleDaoImpl implements ManagerRoleDao {

	@Autowired
	private SessionFactory sessionFactory;

	private Session getCurrentSession() {
		return this.sessionFactory.getCurrentSession();
	}

	@Override
	public Role load(int id) {
		return (Role) this.getCurrentSession().load(Role.class, id);
	}
	
	@Override
	public Role get(int id) {
		return (Role) this.getCurrentSession().get(Role.class, id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Role> findAll() {
		List<Role> Approvals = this.getCurrentSession().createQuery("from Role").setCacheable(true).list();
		return Approvals;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Role> List(int page,int limit,String params) {
		if(params!="")
		{
			String sql="SELECT * from t_role t WHERE t.Name like %"+params+"%";
			//sql = String.format(sql, params);
			List<Role> Approvals = this.getCurrentSession().createSQLQuery(sql).setFirstResult(page-1).setMaxResults(limit).list();
			return Approvals;
		}else{
			List<Role> Approvals = this.getCurrentSession().createQuery("from Role").setFirstResult(page-1).setMaxResults(limit).list();
			return Approvals;
		}
		
	}


	@SuppressWarnings("unchecked")
	@Override
	public Role getByType(String type) {
		Criteria crit = this.getCurrentSession().createCriteria(Role.class);
		crit.add(Restrictions.eq("name", type));
		Role list = (Role)crit.uniqueResult();

		return list;
	}
	
	@Override
	public void persist(Role entity) {
		this.getCurrentSession().persist(entity);

	}

	@Override
	public Integer save(Role entity) {
		return (Integer) this.getCurrentSession().save(entity);
	}

	@Override
	public void saveOrUpdate(Role entity) {
		this.getCurrentSession().saveOrUpdate(entity);
	}

	@Override
	public void delete(int id) {
		Role entity = this.load(id);
		this.getCurrentSession().delete(entity);
	}

	@Override
	public void flush() {
		this.getCurrentSession().flush();

	}

}
